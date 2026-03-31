const PASSWORD = 'Emily011101';
const COOKIE_NAME = 'ph_auth';

const loginPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Political Hypocrites — Private Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #111;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Space Mono', monospace;
    }
    .top-rule { position: fixed; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(to right, #1D3A6B 50%, #B91C1C 50%); }
    .box {
      border: 1px solid rgba(255,255,255,0.12);
      padding: 2.5rem;
      max-width: 380px;
      width: 90%;
      text-align: center;
    }
    h1 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 1.8rem; color: white; line-height: 1; margin-bottom: 0.2rem; }
    h1 span { color: #f87171; display: block; }
    .sub { font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 2rem; margin-top: 0.6rem; }
    label { display: block; font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); text-align: left; margin-bottom: 0.5rem; }
    input[type="password"] { width: 100%; padding: 0.85rem 1rem; background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.15); color: white; font-family: 'Space Mono', monospace; font-size: 0.9rem; outline: none; margin-bottom: 1rem; }
    input[type="password"]:focus { border-color: rgba(255,255,255,0.5); }
    button { width: 100%; padding: 0.85rem; background: #B91C1C; color: white; border: none; cursor: pointer; font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
    button:hover { background: #991b1b; }
    .error { font-size: 0.65rem; color: #f87171; margin-top: 0.8rem; display: none; }
    .bottom-rule { position: fixed; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(to right, #B91C1C 50%, #1D3A6B 50%); }
  </style>
</head>
<body>
  <div class="top-rule"></div>
  <div class="box">
    <h1>Political<span>Hypocrites</span></h1>
    <p class="sub">Private Preview — Not Yet Public</p>
    <label for="pw">Enter Preview Password</label>
    <input type="password" id="pw" placeholder="••••••••••••" onkeydown="if(event.key==='Enter') tryLogin()" autofocus />
    <button onclick="tryLogin()">Enter Site →</button>
    <p class="error" id="err">Incorrect password. Try again.</p>
  </div>
  <div class="bottom-rule"></div>
  <script>
    function tryLogin() {
      const pw = document.getElementById('pw').value;
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw })
      }).then(r => {
        if (r.ok) { window.location.reload(); }
        else { document.getElementById('err').style.display = 'block'; document.getElementById('pw').value = ''; }
      });
    }
  </script>
</body>
</html>`;

export default async function handler(request) {
  const url = new URL(request.url);
  const cookies = parseCookies(request.headers.get('cookie') || '');

  // Handle login POST
  if (request.method === 'POST' && url.pathname === '/api/auth') {
    const body = await request.json();
    if (body.password === PASSWORD) {
      return new Response('OK', {
        status: 200,
        headers: {
          'Set-Cookie': `${COOKIE_NAME}=${PASSWORD}; Path=/; Max-Age=604800; HttpOnly; SameSite=Strict`
        }
      });
    }
    return new Response('Unauthorized', { status: 401 });
  }

  // Check auth cookie
  if (cookies[COOKIE_NAME] === PASSWORD) {
    // Serve the actual file
    const path = url.pathname === '/' ? '/index.html' : url.pathname;
    const fileUrl = new URL(path, url.origin);
    return fetch(fileUrl);
  }

  // Not authenticated — show login page
  return new Response(loginPage, {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  });
}

function parseCookies(cookieHeader) {
  return Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    })
  );
}

export const config = { runtime: 'edge' };
