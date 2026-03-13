import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDSzwOlLQ3Qgxmim5ABoPlsMROo71N46Ok",
  authDomain: "prg-property-group.firebaseapp.com",
  projectId: "prg-property-group",
  storageBucket: "prg-property-group.firebasestorage.app",
  messagingSenderId: "892372337003",
  appId: "1:892372337003:web:01d163aa49133f16be0c2e"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  // Bypass Next.js intercepting the native fetch stream causing infinite hangs
  initializeFirestore(app, { experimentalForceLongPolling: true });
} else {
  app = getApp();
}

// Initialize Cloud Firestore and Cloud Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
