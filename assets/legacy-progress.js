const VERSION = "12.13.0";
const state = {
  configured: false,
  auth: null,
  db: null,
  user: null,
  pendingAttempt: null,
  savedAttemptId: null,
  saveInFlight: false,
};

function configReady(config) {
  return Boolean(config?.apiKey && config?.authDomain && config?.projectId && config?.appId);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function addStyles() {
  if (document.getElementById("oa-legacy-progress-style")) return;
  const style = document.createElement("style");
  style.id = "oa-legacy-progress-style";
  style.textContent = `
    .oa-auth-nav{position:fixed;top:.8rem;right:.8rem;z-index:3000;display:flex;align-items:center;gap:.45rem;max-width:min(calc(100vw - 1.6rem),36rem);padding:.35rem;border:1px solid rgba(255,255,255,.13);border-radius:.55rem;background:rgba(8,8,12,.82);box-shadow:0 14px 34px rgba(0,0,0,.34);backdrop-filter:blur(16px);font-family:Inter,Manrope,system-ui,sans-serif}
    .oa-auth-nav a,.oa-auth-nav button,.oa-auth-nav span{min-height:2rem;border-radius:.38rem;padding:0 .68rem;font-size:.75rem;font-weight:800;letter-spacing:.04em;text-decoration:none;white-space:nowrap}
    .oa-auth-nav a{display:inline-flex;align-items:center;color:#ffd1a6;border:1px solid rgba(255,116,51,.32);background:rgba(255,116,51,.09)}
    .oa-auth-nav button{border:1px solid rgba(255,116,51,.34);color:#111;background:linear-gradient(135deg,#ff7433,#ffbd78);cursor:pointer;font-family:inherit}
    .oa-auth-nav button.secondary{color:#f8efe8;border-color:rgba(255,255,255,.15);background:rgba(255,255,255,.06)}
    .oa-auth-nav img{width:1.85rem;height:1.85rem;border-radius:50%;object-fit:cover;background:rgba(255,255,255,.12)}
    .oa-auth-nav .profile{display:inline-flex;align-items:center;gap:.45rem;color:#f8efe8}
    .oa-auth-nav .name{max-width:9.5rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .oa-auth-nav .setup{display:inline-flex;align-items:center;color:#ffbd78;border:1px solid rgba(255,189,120,.28);background:rgba(255,189,120,.09)}
    .oa-auth-nav [hidden]{display:none!important}
    .oa-progress-card{display:none;margin:1rem auto 0;max-width:820px;border:1px solid rgba(255,255,255,.11);border-radius:.58rem;background:rgba(8,8,12,.78);padding:1rem 1.1rem;color:#d8d2ca;font-family:Inter,Manrope,system-ui,sans-serif}
    .oa-progress-card.show{display:block}
    .oa-progress-title{font-size:1rem;font-weight:900;color:#fff;margin-bottom:.25rem}
    .oa-progress-copy{font-size:.86rem;color:#a8a09a;line-height:1.6;margin-bottom:.75rem}
    .oa-progress-actions{display:flex;flex-wrap:wrap;gap:.55rem;align-items:center}
    .oa-progress-actions button,.oa-progress-actions a{min-height:2.25rem;border-radius:.38rem;padding:0 .85rem;font-size:.74rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;font-family:inherit}
    .oa-progress-actions button{border:0;background:linear-gradient(135deg,#ff7433,#ffbd78);color:#111;cursor:pointer}
    .oa-progress-actions a{display:inline-flex;align-items:center;border:1px solid rgba(255,116,51,.28);color:#ffd1a6;background:rgba(255,116,51,.08)}
    @media(max-width:620px){.oa-auth-nav{left:.8rem;right:.8rem;justify-content:flex-end}.oa-auth-nav .name{max-width:7rem}}
  `;
  document.head.appendChild(style);
}

function basePath() {
  const marker = "/orange-atlas/";
  if (location.pathname.includes(marker)) return location.pathname.slice(0, location.pathname.indexOf(marker) + marker.length);
  return "/";
}

function getAnalyticsHref() {
  return `${basePath()}analytics/`;
}

function renderNav() {
  addStyles();
  if (document.getElementById("oa-legacy-auth-nav")) return;
  const nav = document.createElement("div");
  nav.id = "oa-legacy-auth-nav";
  nav.className = "oa-auth-nav";
  nav.innerHTML = `
    <a href="${getAnalyticsHref()}">Analytics</a>
    <button type="button" data-oa-sign-in>Sign in</button>
    <span class="profile" data-oa-profile hidden><img alt="" data-oa-photo><span class="name" data-oa-name></span></span>
    <button class="secondary" type="button" data-oa-sign-out hidden>Sign out</button>
    <span class="setup" data-oa-setup hidden>Firebase setup needed</span>
  `;
  document.body.appendChild(nav);
}

function updateNav() {
  renderNav();
  const nav = document.getElementById("oa-legacy-auth-nav");
  if (!nav) return;
  const signIn = nav.querySelector("[data-oa-sign-in]");
  const signOut = nav.querySelector("[data-oa-sign-out]");
  const profile = nav.querySelector("[data-oa-profile]");
  const setup = nav.querySelector("[data-oa-setup]");
  const photo = nav.querySelector("[data-oa-photo]");
  const name = nav.querySelector("[data-oa-name]");

  if (!state.configured) {
    signIn.hidden = true;
    signOut.hidden = true;
    profile.hidden = true;
    setup.hidden = false;
    return;
  }

  setup.hidden = true;
  signIn.hidden = Boolean(state.user);
  signOut.hidden = !state.user;
  profile.hidden = !state.user;
  if (state.user) {
    name.textContent = state.user.displayName || state.user.email || "Signed in";
    if (state.user.photoURL) photo.src = state.user.photoURL;
  }
}

function ensureProgressCard() {
  addStyles();
  let card = document.getElementById("oa-legacy-progress-card");
  if (card) return card;
  card = document.createElement("div");
  card.id = "oa-legacy-progress-card";
  card.className = "oa-progress-card";
  card.innerHTML = `
    <div class="oa-progress-title" data-oa-progress-title>Save your progress</div>
    <p class="oa-progress-copy" data-oa-progress-copy>Sign in with Google to keep this attempt in your analytics dashboard.</p>
    <div class="oa-progress-actions">
      <button type="button" data-oa-progress-sign-in>Sign in with Google</button>
      <a href="${getAnalyticsHref()}" data-oa-progress-link hidden>View analytics</a>
    </div>
  `;

  const target = document.getElementById("score-banner")
    || document.getElementById("sbanner")
    || document.getElementById("res-header")
    || document.body.firstElementChild;
  if (target?.insertAdjacentElement) target.insertAdjacentElement("afterend", card);
  else document.body.appendChild(card);

  return card;
}

function setProgressCard(mode, detail) {
  const card = ensureProgressCard();
  const title = card.querySelector("[data-oa-progress-title]");
  const copy = card.querySelector("[data-oa-progress-copy]");
  const signIn = card.querySelector("[data-oa-progress-sign-in]");
  const link = card.querySelector("[data-oa-progress-link]");
  card.classList.add("show");
  signIn.hidden = true;
  link.hidden = true;

  if (mode === "unconfigured") {
    title.textContent = "Progress tracking needs Firebase setup";
    copy.textContent = "Add the PUBLIC_FIREBASE_* values to enable Google sign-in and saved analytics.";
    return;
  }
  if (mode === "signed-out") {
    title.textContent = "Save your progress";
    copy.textContent = "Sign in with Google to keep this attempt in your analytics dashboard.";
    signIn.hidden = false;
    return;
  }
  if (mode === "saving") {
    title.textContent = "Saving progress";
    copy.textContent = "Your attempt is being added to your analytics dashboard.";
    return;
  }
  if (mode === "saved") {
    title.textContent = "Progress saved";
    copy.textContent = "This attempt is now included in your mastery and improvement analytics.";
    link.hidden = false;
    return;
  }
  title.textContent = "Progress was not saved";
  copy.textContent = detail || "There was a problem saving this attempt. Your score above is still available on this page.";
}

async function loadFirebase() {
  await import(new URL("../firebase-config.js", import.meta.url).href);
  const config = window.__ORANGE_ATLAS_FIREBASE_CONFIG__;
  state.configured = configReady(config);
  updateNav();
  if (!state.configured) return;

  const [appMod, authMod, firestoreMod] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${VERSION}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${VERSION}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${VERSION}/firebase-firestore.js`),
  ]);

  const app = appMod.initializeApp(config);
  state.auth = authMod.getAuth(app);
  state.db = firestoreMod.getFirestore(app);
  state.authMod = authMod;
  state.firestoreMod = firestoreMod;

  authMod.getRedirectResult(state.auth).catch((error) => {
    console.warn("Unable to complete Orange Atlas sign-in redirect", error);
  });
  authMod.onAuthStateChanged(state.auth, (user) => {
    state.user = user;
    if (user) ensureUserProfile(user).catch((error) => console.warn("Unable to update profile", error));
    updateNav();
    if (state.pendingAttempt && !state.savedAttemptId) savePendingAttempt();
  });
}

async function ensureUserProfile(user) {
  const { doc, getDoc, serverTimestamp, setDoc } = state.firestoreMod;
  const userRef = doc(state.db, "users", user.uid);
  const snap = await getDoc(userRef);
  await setDoc(userRef, {
    uid: user.uid,
    displayName: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    lastSeenAt: serverTimestamp(),
    ...(snap.exists() ? {} : { createdAt: serverTimestamp() }),
  }, { merge: true });
}

async function signIn() {
  if (!state.configured || !state.auth) return;
  const { GoogleAuthProvider, signInWithPopup, signInWithRedirect } = state.authMod;
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    const result = await signInWithPopup(state.auth, provider);
    await ensureUserProfile(result.user);
  } catch (error) {
    if (error?.code === "auth/popup-blocked" || error?.code === "auth/cancelled-popup-request") {
      await signInWithRedirect(state.auth, provider);
      return;
    }
    console.warn("Orange Atlas authentication error", error);
  }
}

async function signOutUser() {
  if (!state.auth) return;
  await state.authMod.signOut(state.auth);
}

async function savePendingAttempt() {
  if (!state.pendingAttempt || state.saveInFlight || state.savedAttemptId) return;
  if (!state.configured) {
    setProgressCard("unconfigured");
    return;
  }
  if (!state.user) {
    setProgressCard("signed-out");
    return;
  }

  state.saveInFlight = true;
  setProgressCard("saving");
  try {
    const { addDoc, collection, serverTimestamp } = state.firestoreMod;
    await ensureUserProfile(state.user);
    const docRef = await addDoc(collection(state.db, "users", state.user.uid, "attempts"), {
      ...state.pendingAttempt,
      userId: state.user.uid,
      schemaVersion: 1,
      completedAt: serverTimestamp(),
      completedAtClient: new Date().toISOString(),
    });
    state.savedAttemptId = docRef.id;
    setProgressCard("saved");
  } catch (error) {
    console.warn("Unable to save Orange Atlas attempt", error);
    setProgressCard("error");
  } finally {
    state.saveInFlight = false;
  }
}

document.addEventListener("click", (event) => {
  const signInButton = event.target.closest("[data-oa-sign-in], [data-oa-progress-sign-in]");
  const signOutButton = event.target.closest("[data-oa-sign-out]");
  if (signInButton) {
    event.preventDefault();
    signIn();
  }
  if (signOutButton) {
    event.preventDefault();
    signOutUser();
  }
});

window.orangeAtlasLegacyTrack = (payload) => {
  state.pendingAttempt = payload;
  state.savedAttemptId = null;
  savePendingAttempt();
};

renderNav();
loadFirebase().catch((error) => {
  console.warn("Unable to initialize Orange Atlas progress tracking", error);
  state.configured = false;
  updateNav();
});
