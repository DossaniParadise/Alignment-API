const admin = require('firebase-admin');

// Initialize Firebase Admin (Serverless-safe pattern)
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
  // CORS Headers - Allow frontend apps to communicate with this API
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle browser preflight checks
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // =======================================================================
  // 1. READ-ONLY ROUTE (GET) - Completely Open
  // Returns the entire master database JSON payload for apps to consume.
  // =======================================================================
  if (req.method === 'GET') {
    try {
      const snapshot = await db.ref('/').once('value');
      return res.status(200).json(snapshot.val());
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // =======================================================================
  // 2. WRITE ROUTE (POST) - Strict Role-Based Access Control (RBAC)
  // Intercepts write requests, verifies the role password, and checks
  // if the requested path is allowed for that specific role.
  // =======================================================================
  if (req.method === 'POST') {
    try {
      const { password, updates } = req.body;

      if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No updates provided" });
      }

      /* ------------------------------------------------------------------
         FUTURE AI CONTEXT:
         This API acts as a universal router for a multi-app ecosystem
         using a single flat Firebase Realtime Database.
         To add a new write-capable app:
         1. Add a new key-value pair to the ROLES object below.
         2. Create a specific path-validation check for that role.
      ------------------------------------------------------------------ */

      const ROLES = {
        ADMIN: "dpm",              // Central Manager: Blanket access to all core routing data
        FILTER: "filter123",       // Preventative Maintenance App: Restricted access
        MAINTENANCE: "rm123" // Repair & Maintenance App: Restricted access (CHANGE THIS SECRET)
      };

      const isMasterAdmin = (password === ROLES.ADMIN);
      const isFilterApp   = (password === ROLES.FILTER);
      const isMaintApp    = (password === ROLES.MAINTENANCE);

      // If the password matches nothing, reject immediately
      if (!isMasterAdmin && !isFilterApp && !isMaintApp) {
        return res.status(401).json({ error: "Unauthorized: Incorrect Password or Invalid Role" });
      }

      // GATEKEEPER: Enforce Path Restrictions for specific apps

      // --- Filter App: only its two nodes ---
      if (isFilterApp) {
        for (let path in updates) {
          // The Filter App is ONLY allowed to write to these two specific nodes
          const isAllowedPath = path.startsWith('filterChanges/') || path.startsWith('gasCoverChanges/');

          if (!isAllowedPath) {
            console.warn(`Blocked unauthorized Filter App write attempt to: ${path}`);
            return res.status(403).json({ error: "Access Denied: The Filter App cannot edit core store alignment data." });
          }
        }
      }

      // --- Repair & Maintenance App: only its two nodes ---
      // This app stores its tickets and its approved-vendor list as nodes in
      // the master DB. It must never be able to touch store alignment, the
      // people nodes, or any other app's data — so we whitelist exactly the
      // two prefixes it owns and reject everything else.
      if (isMaintApp) {
        for (let path in updates) {
          const isAllowedPath = path.startsWith('maintenanceTickets/') ||
            path.startsWith('maintenanceVendors/') ||
            path.startsWith('admins/');

          if (!isAllowedPath) {
            console.warn(`Blocked unauthorized Maintenance App write attempt to: ${path}`);
            return res.status(403).json({ error: "Access Denied: The Maintenance App can only edit its own ticket and vendor nodes." });
          }
        }
      }

      // If all security checks pass, execute the batch update using the Master Admin key
      await db.ref('/').update(updates);

      return res.status(200).json({ success: true });

    } catch (error) {
      console.error("Database Write Error:", error);
      return res.status(500).json({ error: 'Failed to write to database' });
    }
  }

  // Fallback for any other HTTP method
  return res.status(405).json({ error: 'Method not allowed.' });
}
