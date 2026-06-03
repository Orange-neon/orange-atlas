import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type Firestore,
} from "firebase/firestore";

export interface QuestionResult {
  id: number | string;
  section: string;
  type: string;
  media: string;
  correct: boolean;
}

export interface BucketStat {
  correct: number;
  total: number;
}

export interface AttemptPayload {
  testSlug: string;
  testTitle: string;
  course: string;
  unit: string;
  score: number;
  total: number;
  percent: number;
  elapsedSeconds: number;
  timedOut: boolean;
  sectionStats: Record<string, BucketStat>;
  typeStats: Record<string, BucketStat>;
  mediaStats: Record<string, BucketStat>;
  questionResults: QuestionResult[];
  source?: string;
}

export interface StoredAttempt extends AttemptPayload {
  id: string;
  userId: string;
  schemaVersion: number;
  completedAt?: unknown;
  completedAtClient?: string;
}

interface FirebaseServices {
  app: FirebaseApp;
  auth: ReturnType<typeof getAuth>;
  db: Firestore;
}

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let services: FirebaseServices | null = null;

export function isFirebaseConfigured() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId,
  );
}

function getFirebaseServices(): FirebaseServices | null {
  if (!isFirebaseConfigured()) return null;
  if (services) return services;

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  services = {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
  };
  return services;
}

function getGoogleProvider() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
}

export function getCurrentUser() {
  return getFirebaseServices()?.auth.currentUser ?? null;
}

export async function getCurrentIdToken(forceRefresh = false) {
  const user = getCurrentUser();
  return user ? user.getIdToken(forceRefresh) : null;
}

export async function ensureUserProfile(user: User) {
  const active = getFirebaseServices();
  if (!active) return;

  const userRef = doc(active.db, "users", user.uid);
  const snap = await getDoc(userRef);
  const profile = {
    uid: user.uid,
    displayName: user.displayName ?? "",
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
    lastSeenAt: serverTimestamp(),
    ...(snap.exists() ? {} : { createdAt: serverTimestamp() }),
  };

  await setDoc(userRef, profile, { merge: true });
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  const active = getFirebaseServices();
  if (!active) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(active.auth, (user) => {
    if (user) {
      ensureUserProfile(user).catch((error) => {
        console.warn("Unable to update Orange Atlas user profile", error);
      });
    }
    callback(user);
  });
}

export async function completeRedirectSignIn() {
  const active = getFirebaseServices();
  if (!active) return null;

  const result = await getRedirectResult(active.auth);
  if (result?.user) await ensureUserProfile(result.user);
  return result?.user ?? null;
}

export async function signInWithGoogle() {
  const active = getFirebaseServices();
  if (!active) {
    throw new Error("Firebase is not configured.");
  }

  try {
    const result = await signInWithPopup(active.auth, getGoogleProvider());
    await ensureUserProfile(result.user);
    return result.user;
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    if (code === "auth/popup-blocked" || code === "auth/cancelled-popup-request") {
      await signInWithRedirect(active.auth, getGoogleProvider());
      return null;
    }
    throw error;
  }
}

export async function signOutGoogle() {
  const active = getFirebaseServices();
  if (!active) return;
  await signOut(active.auth);
}

export async function saveAttempt(payload: AttemptPayload) {
  const active = getFirebaseServices();
  const user = active?.auth.currentUser;
  if (!active || !user) {
    return { status: "signed-out" as const };
  }

  await ensureUserProfile(user);

  const docRef = await addDoc(collection(active.db, "users", user.uid, "attempts"), {
    ...payload,
    userId: user.uid,
    schemaVersion: 1,
    completedAt: serverTimestamp(),
    completedAtClient: new Date().toISOString(),
  });

  return { status: "saved" as const, id: docRef.id };
}

export async function loadUserAttempts(maxAttempts = 250): Promise<StoredAttempt[]> {
  const active = getFirebaseServices();
  const user = active?.auth.currentUser;
  if (!active || !user) return [];

  const attemptsQuery = query(
    collection(active.db, "users", user.uid, "attempts"),
    orderBy("completedAt", "desc"),
    limit(maxAttempts),
  );
  const snapshot = await getDocs(attemptsQuery);

  return snapshot.docs.map((attemptDoc) => ({
    id: attemptDoc.id,
    ...(attemptDoc.data() as Omit<StoredAttempt, "id">),
  }));
}
