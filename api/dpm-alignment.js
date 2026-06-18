const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: "https://dpm-alignment-default-rtdb.firebaseio.com" 
  });
}

const db = admin.database();

export default async function handler(req, res) {
  // CORS Headers - We added POST and Content-Type to allow secure saving
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle browser preflight checks
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle Read-Only Requests (Your dashboard and other apps)
  if (req.method === 'GET') {
    try {
      const snapshot = await db.ref('/').once('value');
      return res.status(200).json(snapshot.val());
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Handle Write Requests (Only from your Admin Dashboard)
  if (req.method === 'POST') {
    try {
      const { password, updates } = req.body;

      // 1. Verify the frontend unlock password
      if (password !== "dpm") {
        return res.status(401).json({ error: "Unauthorized: Editing Locked" });
      }

      if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No updates provided" });
      }

      // 2. Securely execute the updates using the master admin keys
      await db.ref('/').update(updates);
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Database Write Error:", error);
      return res.status(500).json({ error: 'Failed to write to database' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
