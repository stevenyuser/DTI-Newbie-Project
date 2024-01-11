// @ts-nocheck
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./service_account.json";

// vercel env 
const app = initializeApp({
  credential: cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string),
});
const db = getFirestore();

export { db };