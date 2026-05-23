import{s as D,i as G,l as j}from"./progress.DOif9XmM.js";const S=JSON.parse(document.getElementById("test-metadata")?.textContent||"[]"),H=new Map(S.map(e=>[e.slug,e])),x=["Unidad 4 - En el Consultorio","Unidad 5 - La Tecnologia","Unidad 6 - La Vivienda","Semester 2 Final Review"],w=document.getElementById("analytics-gate"),C=document.getElementById("analytics-dashboard"),y=document.querySelector(".hero"),p=document.getElementById("auth-state"),U=document.getElementById("gate-title"),N=document.getElementById("gate-copy"),F=document.getElementById("gate-signin"),d=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),A=(e,r)=>r?Math.round(e/r*100):0,O=e=>e>=85?"good":e<70?"bad":"mid";function k(e){return e.completedAt&&typeof e.completedAt.toDate=="function"?e.completedAt.toDate().getTime():e.completedAt&&typeof e.completedAt.seconds=="number"?e.completedAt.seconds*1e3:e.completedAtClient?Date.parse(e.completedAtClient):0}function R(e){const r=k(e);return r?new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric"}).format(new Date(r)):"Saved attempt"}function b(e){return[...e].sort((r,t)=>k(t)-k(r))}function I(e,r,t,n){const o=r||"Uncategorized",i=e.get(o)||{key:o,correct:0,total:0};i.correct+=t,i.total+=n,e.set(o,i)}function _(e){const r=new Map;return e.forEach(t=>{(t.questionResults||[]).forEach(n=>{I(r,n.section,n.correct?1:0,1)})}),[...r.values()].map(t=>({...t,percent:A(t.correct,t.total)})).sort((t,n)=>t.percent===n.percent?n.total-t.total:n.percent-t.percent)}function P(e){const r=new Map;return e.forEach(t=>I(r,t.unit,t.score||0,t.total||0)),[...r.values()].map(t=>({...t,percent:A(t.correct,t.total)}))}function L(e,r){const t=new Map;return e.forEach(n=>{const o=n[r]||{};Object.entries(o).forEach(([i,u])=>{I(t,i,Number(u.correct)||0,Number(u.total)||0)})}),[...t.values()].map(n=>({...n,percent:A(n.correct,n.total)})).sort((n,o)=>n.percent===o.percent?o.total-n.total:o.percent-n.percent)}function m(e,r,t){const n=document.getElementById(e);if(n){if(!r.length){n.innerHTML=`<p class="empty">${d(t)}</p>`;return}n.innerHTML=r.join("")}}function v(e,r,t,n=""){return`<article class="mini-card">
          <div>
            <div class="mini-title">${d(e)}</div>
            <div class="mini-sub">${d(r)}</div>
          </div>
          <div class="score-chip ${n||O(t)}">${t}%</div>
        </article>`}function Q(e,r,t=""){return`<a class="practice-card" href="${d(e.href)}" aria-label="Open ${d(e.title)}">
          <p class="practice-kicker">${d(r)} Practice</p>
          <h3 class="practice-title">${d(e.title)}</h3>
          <p class="practice-note">${d(t||`${e.unit} - ${e.questionCount} questions`)}</p>
          <p class="practice-open">Start Test -></p>
        </a>`}function z(e){const r=document.getElementById("score-trend");if(!r)return;const t=b(e).reverse().slice(-12);if(!t.length){r.innerHTML='<p class="empty">Complete a test while signed in to start a score trend.</p>';return}const n=760,o=240,i=44,u=18,g=42,c=n-i*2,f=o-u-g,l=t.map((a,$)=>{const M=t.length===1?n/2:i+$/(t.length-1)*c,T=Math.max(0,Math.min(100,Number(a.percent)||0)),q=u+(1-T/100)*f;return{attempt:a,value:T,x:M,y:q}}),h=l.map(a=>`${a.x.toFixed(1)},${a.y.toFixed(1)}`).join(" "),B=`${i},${o-g} ${h} ${n-i},${o-g}`,s=l.map((a,$)=>`${t.length<=6||$===0||$===t.length-1||$%2===1?`<text class="chart-label" x="${a.x}" y="${o-13}" text-anchor="middle">${d(R(a.attempt))}</text>`:""}
            <circle class="chart-dot" cx="${a.x}" cy="${a.y}" r="5">
              <title>${d(a.attempt.testTitle)} - ${a.value}%</title>
            </circle>
            <text class="chart-label" x="${a.x}" y="${Math.max(14,a.y-10)}" text-anchor="middle">${a.value}%</text>`).join("");r.innerHTML=`<div class="chart-wrap">
          <svg class="line-chart" viewBox="0 0 ${n} ${o}" role="img" aria-label="Score trend chart">
            <defs>
              <linearGradient id="scoreLineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ffbd78" />
                <stop offset="48%" stop-color="#ff7433" />
                <stop offset="100%" stop-color="#080808" />
              </linearGradient>
              <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ff7433" stop-opacity="0.42" />
                <stop offset="58%" stop-color="#ff7433" stop-opacity="0.14" />
                <stop offset="100%" stop-color="#000000" stop-opacity="0.88" />
              </linearGradient>
            </defs>
            <text class="chart-axis" x="6" y="${u+5}">100%</text>
            <text class="chart-axis" x="13" y="${o-g}">0%</text>
            <polyline class="chart-fill" points="${B}" />
            <polyline class="chart-line" points="${h}" />
            ${s}
          </svg>
        </div>`}function J(e){const r=b(e).slice(0,6).map(t=>{const n=Number(t.percent)||0;return`<article class="mini-card">
            <div>
              <div class="mini-title">${d(t.testTitle)}</div>
              <div class="mini-sub">${d(t.unit)} - ${d(R(t))}</div>
            </div>
            <div class="score-chip ${O(n)}">${n}%</div>
          </article>`});m("recent-attempts",r,"Saved attempts will appear here.")}function K(e){const r=[];b(e).forEach(n=>{(n.questionResults||[]).forEach(o=>{o.correct||r.push({attempt:n,question:o})})});const t=r.slice(0,8).map(({attempt:n,question:o})=>`<article class="mini-card">
          <div>
            <div class="mini-title">${d(o.section)}</div>
            <div class="mini-sub">${d(n.testTitle)} - Question ${d(o.id)} - ${d(o.type)}</div>
          </div>
          <div class="score-chip bad">Review</div>
        </article>`);m("recent-misses",t,"Missed question tags will appear after saved attempts.")}function W(e,r){return e?S.find(t=>t.group===e.group&&t.sequence>e.sequence&&!r.has(t.slug))||S.find(t=>t.slug===e.slug):null}function X(e,r){const t=x.indexOf(e);if(t===-1)return null;for(let n=t+1;n<x.length;n++){const o=S.find(i=>i.unit===x[n]&&!r.has(i.slug));if(o)return o}return null}function V(e,r,t){const n=new Set(e.map(c=>c.testSlug)),o=[],i=new Set;b(e).filter(c=>Number(c.percent)<70||t.includes(c.unit)).forEach(c=>{const f=H.get(c.testSlug),l=W(f,n);l&&!i.has(l.slug)&&(i.add(l.slug),o.push({test:l,chip:l.slug===f?.slug?"Retry":"Next",reason:`${c.testTitle} is a focus area at ${Number(c.percent)||0}%.`}))});const u=new Map;e.forEach(c=>{Number(c.percent)>=85&&u.set(c.unit,(u.get(c.unit)||0)+1)}),u.forEach((c,f)=>{if(c<2)return;const l=X(f,n);l&&!i.has(l.slug)&&(i.add(l.slug),o.push({test:l,chip:"Advance",reason:`${f} has ${c} mastered attempts.`}))});const g=o.slice(0,6).map(({test:c,chip:f,reason:l})=>Q(c,f,`${l} ${c.questionCount} questions.`));m("recommendations",g,"No recommendations yet. Complete at least one test so Orange Atlas can recommend the next version, a retry, or the next unit.")}function Y(e){const r=b(e),t=e.length,n=e.reduce((s,a)=>s+(Number(a.score)||0),0),o=e.reduce((s,a)=>s+(Number(a.total)||0),0),i=A(n,o),u=_(e),g=P(e),c=L(e,"typeStats"),f=L(e,"mediaStats"),l=u.filter(s=>s.total>=8&&s.percent>=85),h=u.filter(s=>s.total>=5&&s.percent<70).sort((s,a)=>s.percent-a.percent),B=g.filter(s=>s.percent<70).map(s=>s.key);document.getElementById("stat-attempts").textContent=String(t),document.getElementById("stat-average").textContent=`${i}%`,document.getElementById("stat-mastered").textContent=String(l.length),document.getElementById("stat-focus").textContent=String(h.length),z(r),m("unit-list",g.sort((s,a)=>x.indexOf(s.key)-x.indexOf(a.key)).map(s=>v(s.key,`${s.correct}/${s.total} correct`,s.percent)),"Unit performance appears after saved attempts."),m("type-list",c.map(s=>v(s.key,`${s.correct}/${s.total} correct`,s.percent)),"Question-type performance appears after saved attempts."),m("media-list",f.map(s=>v(s.key,`${s.correct}/${s.total} correct`,s.percent)),"Source and media performance appears after saved attempts."),m("mastered-list",l.slice(0,8).map(s=>v(s.key,`${s.correct}/${s.total} correct`,s.percent,"good")),"No mastered areas yet. 85%+ across 8 tagged questions will unlock this list."),m("weak-list",h.slice(0,8).map(s=>v(s.key,`${s.correct}/${s.total} correct`,s.percent,"bad")),"No focus areas yet. More saved attempts will make this sharper."),J(r),K(r),V(r,h.map(s=>s.key),B)}function E(e,r,t){y&&(y.hidden=!1),C&&(C.hidden=!0),w&&(w.hidden=!1),U&&(U.textContent=e),N&&(N.textContent=r),F&&(F.hidden=!t)}async function Z(){if(!G()){p&&(p.textContent="Firebase setup needed"),E("Firebase setup needed","Add PUBLIC_FIREBASE_* values before Google sign-in and analytics can load.",!1);return}p&&(p.textContent="Loading analytics");try{const e=await j();y&&(y.hidden=!0),w&&(w.hidden=!0),C&&(C.hidden=!1),p&&(p.textContent=`${e.length} saved attempt${e.length===1?"":"s"}`),Y(e)}catch(e){console.warn("Unable to load Orange Atlas analytics",e),p&&(p.textContent="Analytics failed to load"),E("Analytics failed to load","Check Firebase configuration and Firestore rules, then try again.",!1)}}D(e=>{if(!G()){p&&(p.textContent="Firebase setup needed"),E("Firebase setup needed","Add PUBLIC_FIREBASE_* values before Google sign-in and analytics can load.",!1);return}if(!e){p&&(p.textContent="Signed out"),E("Sign in to view analytics","Use Google sign-in to load saved attempts and progress insights.",!0);return}y&&(y.hidden=!0),Z()});
