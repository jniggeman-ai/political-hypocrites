(function () {
  var PASSWORD = 'Emily011101';
  var KEY = 'ph_access';

  // Already authenticated
  if (localStorage.getItem(KEY) === PASSWORD) return;

  // Show the password overlay
  var style = document.createElement('style');
  style.textContent = `
    #ph-gate {
      position: fixed; inset: 0; z-index: 999999;
      background: #111;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      font-family: 'Space Mono', monospace;
    }
    #ph-gate .top-bar {
      position: fixed; top: 0; left: 0; right: 0; height: 5px;
      background: linear-gradient(to right, #1D3A6B 50%, #B91C1C 50%);
    }
    #ph-gate .bot-bar {
      position: fixed; bottom: 0; left: 0; right: 0; height: 4px;
      background: linear-gradient(to right, #B91C1C 50%, #1D3A6B 50%);
    }
    #ph-gate .box {
      border: 1px solid rgba(255,255,255,0.12);
      padding: 2.5rem;
      max-width: 380px;
      width: 90%;
      text-align: center;
    }
    #ph-gate h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-weight: 900; font-size: 1.8rem;
      color: white; line-height: 1; margin-bottom: 0.2rem;
    }
    #ph-gate h1 span { color: #f87171; display: block; }
    #ph-gate .sub {
      font-size: 0.6rem; letter-spacing: 0.14em;
      text-transform: uppercase; color: rgba(255,255,255,0.3);
      margin-bottom: 2rem; margin-top: 0.6rem;
    }
    #ph-gate label {
      display: block; font-size: 0.58rem; letter-spacing: 0.12em;
      text-transform: uppercase; color: rgba(255,255,255,0.4);
      text-align: left; margin-bottom: 0.5rem;
    }
    #ph-gate input {
      width: 100%; padding: 0.85rem 1rem;
      background: rgba(255,255,255,0.05);
      border: 1.5px solid rgba(255,255,255,0.15);
      color: white; font-family: 'Space Mono', monospace;
      font-size: 0.9rem; outline: none; margin-bottom: 1rem;
      box-sizing: border-box;
    }
    #ph-gate input:focus { border-color: rgba(255,255,255,0.5); }
    #ph-gate button {
      width: 100%; padding: 0.85rem;
      background: #B91C1C; color: white; border: none;
      cursor: pointer; font-family: 'Space Mono', monospace;
      font-size: 0.7rem; letter-spacing: 0.1em;
      text-transform: uppercase; font-weight: 700;
    }
    #ph-gate button:hover { background: #991b1b; }
    #ph-gate .error {
      font-size: 0.65rem; color: #f87171;
      margin-top: 0.8rem; display: none;
    }
  `;
  document.head.appendChild(style);

  var gate = document.createElement('div');
  gate.id = 'ph-gate';
  gate.innerHTML = `
    <div class="top-bar"></div>
    <div class="box">
      <h1>Political<span>Hypocrites</span></h1>
      <p class="sub">Private Preview — Not Yet Public</p>
      <label for="ph-pw">Enter Preview Password</label>
      <input type="password" id="ph-pw" placeholder="••••••••••••" />
      <button id="ph-btn">Enter Site →</button>
      <p class="error" id="ph-err">Incorrect password. Try again.</p>
    </div>
    <div class="bot-bar"></div>
  `;
  document.body.appendChild(gate);

  function tryLogin() {
    var val = document.getElementById('ph-pw').value;
    if (val === PASSWORD) {
      localStorage.setItem(KEY, PASSWORD);
      document.getElementById('ph-gate').remove();
    } else {
      document.getElementById('ph-err').style.display = 'block';
      document.getElementById('ph-pw').value = '';
      document.getElementById('ph-pw').focus();
    }
  }

  document.getElementById('ph-btn').addEventListener('click', tryLogin);
  document.getElementById('ph-pw').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') tryLogin();
  });
})();
