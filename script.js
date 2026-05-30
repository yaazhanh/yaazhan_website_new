/* =====================================================
   YAAZHAN — script.js
   Update BIRTH_DATE with actual birth date!
   ===================================================== */

/* ====== CURSOR ====== */
const cursor  = document.querySelector('.cursor');
const trail   = document.querySelector('.cursor-trail');
let mx = 0, my = 0;
if (cursor) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  setInterval(() => {
    if (trail) { trail.style.left = mx + 'px'; trail.style.top = my + 'px'; }
  }, 80);
  document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.6)');
  document.addEventListener('mouseup',   () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
}

/* ====== ACTIVE NAV ====== */
(function() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

/* ====== MOBILE NAV ====== */
const menuBtn = document.querySelector('.nav-menu-btn');
const navList = document.querySelector('.nav-links');
if (menuBtn && navList) {
  menuBtn.addEventListener('click', () => {
    navList.classList.toggle('open');
    menuBtn.textContent = navList.classList.contains('open') ? '✕' : '☰';
  });
  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navList.classList.remove('open');
      menuBtn.textContent = '☰';
    });
  });
}

/* ====== FLOATING EMOJIS PARALLAX ====== */
const floats = document.querySelectorAll('.emoji-float');
if (floats.length) {
  // randomise positions on load
  floats.forEach((el, i) => {
    el.style.left   = (8 + Math.random() * 84) + '%';
    el.style.top    = (5 + Math.random() * 88) + '%';
    el.style.fontSize          = (1.2 + Math.random() * 2) + 'rem';
    el.style.opacity           = (0.25 + Math.random() * 0.4).toString();
    el.style.animationDelay    = (Math.random() * 6) + 's';
    el.style.animationDuration = (7 + Math.random() * 9) + 's';
    el.style.animation         = `floatBob ${(7 + Math.random() * 9).toFixed(1)}s ease-in-out ${(Math.random()*6).toFixed(1)}s infinite`;
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatBob {
      0%,100% { transform: translate(0,0) rotate(-4deg); }
      33%      { transform: translate(-8px,-18px) rotate(4deg); }
      66%      { transform: translate(8px,-10px) rotate(-2deg); }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    floats.forEach((el, i) => {
      const d = ((i % 5) + 1) * 6;
      el.style.transform = `translate(${cx*d}px,${cy*d}px) rotate(${cx*14}deg)`;
    });
  });
}

/* ====== SCROLL ANIMATION ====== */
const animEls = document.querySelectorAll('.anim');
if (animEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), idx * 70);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animEls.forEach(el => obs.observe(el));
}

/* ====== CONFETTI (home page only) ====== */
const confettiCSS = document.createElement('style');
confettiCSS.textContent = `@keyframes confettiFall { to { transform:translateY(110vh) rotate(720deg); opacity:0; } }`;
document.head.appendChild(confettiCSS);

function launchConfetti() {
  const colors = ['#FFE94E','#FF4ECD','#4EFFB4','#4E9EFF','#FF8C4E','#C44EFF'];
  for (let i = 0; i < 90; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      const sz = Math.random() * 10 + 6;
      Object.assign(p.style, {
        position:'fixed', top:'-20px',
        left: Math.random()*100 + 'vw',
        width:sz+'px', height:sz+'px',
        background: colors[Math.floor(Math.random()*colors.length)],
        borderRadius: Math.random()>0.5 ? '50%' : '3px',
        zIndex:'99990', pointerEvents:'none',
        animation:`confettiFall ${(Math.random()*2+2).toFixed(1)}s ease-in forwards`,
        opacity:'0.9',
      });
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 5000);
    }, i * 28);
  }
}
if (document.body.dataset.page === 'home') setTimeout(launchConfetti, 500);

/* ====== CONTACT PAGE ====== */
(function contactPage() {
  const form     = document.getElementById('contact-form');
  const wall     = document.getElementById('message-wall');
  const successEl = document.getElementById('success-msg');
  if (!form) return;

  // emoji picker
  const epBtns = document.querySelectorAll('.ep-btn');
  let pickedEmoji = '💌';
  epBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      epBtns.forEach(b => b.classList.remove('picked'));
      btn.classList.add('picked');
      pickedEmoji = btn.dataset.emoji;
    });
  });

  // load stored messages
  let messages = [];
  try { messages = JSON.parse(localStorage.getItem('yaazhan_notes') || '[]'); } catch(e){}
  renderWall(messages);

  form.addEventListener('submit', async e => {
  e.preventDefault();

  const name = form.querySelector('#f-name').value.trim();
  const rel  = form.querySelector('#f-rel').value;
  const msg  = form.querySelector('#f-msg').value.trim();

  if (!name || !msg) return;

  const entry = {
    name,
    rel,
    msg,
    emoji: pickedEmoji,
    date: new Date().toLocaleDateString('en-IN', {
      day:'numeric',
      month:'short',
      year:'numeric'
    })
  };

  // Save locally (your existing feature)
  messages.unshift(entry);
  localStorage.setItem(
    'yaazhan_notes',
    JSON.stringify(messages.slice(0,50))
  );
  renderWall(messages);

  // Send to Netlify
  const formData = new URLSearchParams();
  formData.append('form-name', 'yaazhan-notes');
  formData.append('name', name);
  formData.append('relationship', rel);
  formData.append('message', msg);
  formData.append('emoji', pickedEmoji);

  await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  });

  form.style.display = 'none';
  successEl.style.display = 'block';
  setTimeout(launchConfetti, 200);
});

  function renderWall(msgs) {
    if (!wall) return;
    wall.innerHTML = msgs.map(m => `
      <div class="message-card">
        <div class="mc-header">
          <span class="mc-emoji">${m.emoji}</span>
          <div>
            <div class="mc-name">${escHtml(m.name)}</div>
            <div class="mc-rel">${escHtml(m.rel || 'A fan')}</div>
          </div>
        </div>
        <p class="mc-text">"${escHtml(m.msg)}"</p>
        <div class="mc-date">${m.date}</div>
      </div>
    `).join('');
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
})();
