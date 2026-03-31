const PASSWORD = 'Emily011101'; // 👈 Must match the password in middleware.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { password } = req.body;

  if (password === PASSWORD) {
    // Set a cookie that lasts 7 days
    res.setHeader('Set-Cookie', `ph_auth=${PASSWORD}; Path=/; Max-Age=604800; HttpOnly; SameSite=Strict`);
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: 'Wrong password' });
}
