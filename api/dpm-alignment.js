const admin = require('firebase-admin');

// 1. Initialize Firebase Admin (Serverless-safe pattern)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Vercel environment variables escape newlines, so we must replace them
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    // This is the database URL from your frontend HTML
    databaseURL: "https://dpm-alignment-default-rtdb.firebaseio.com" 
  });
}

const db = admin.database();

export default async function handler(req, res) {
  // 2. Set CORS headers so your other apps can fetch this URL without browser errors
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Enforce Read-Only access on this endpoint
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. This API is read-only.' });
  }

  try {
    // 3. Fetch the routing data from your Realtime Database
    // Note: Pulling the root '/' grabs everything. If you only want stores and coaches, change '/' to '/restaurants' etc.
    const snapshot = await db.ref('/').once('value');
    const data = snapshot.val();
    
    // 4. Return the data as JSON
    res.status(200).json(data);
  } catch (error) {
    console.error("Firebase Admin Connection Error:", error);
    res.status(500).json({ error: 'Internal Server Error while fetching routing data.' });
  }
}
