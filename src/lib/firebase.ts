import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { Capacitor } from '@capacitor/core';
import { 
  getAuth, 
  signInWithPopup, 
  signInWithRedirect,
  GoogleAuthProvider, 
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore,
  doc as firestoreDoc,
  collection as firestoreCollection,
  getDoc as firestoreGetDoc,
  setDoc as firestoreSetDoc,
  updateDoc as firestoreUpdateDoc,
  addDoc as firestoreAddDoc,
  deleteDoc as firestoreDeleteDoc,
  query as firestoreQuery,
  where as firestoreWhere,
  orderBy as firestoreOrderBy,
  getDocs as firestoreGetDocs,
  onSnapshot as firestoreOnSnapshot,
  runTransaction as firestoreRunTransaction,
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// App Check starts when a site key has been configured in the hosting
// environment and the web app has been registered in Firebase Console.
// Enforcement is enabled separately in Firebase Console after monitoring.
const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY?.trim();
export const firebaseAppCheckConfigured = Boolean(
  appCheckSiteKey && !import.meta.env.DEV && !Capacitor.isNativePlatform()
);
if (firebaseAppCheckConfigured && appCheckSiteKey) {
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch {
    // Avoid exposing provider diagnostics or identifiers in client logs.
    // Firebase product enforcement must be enabled only after deployment checks.
  }
}

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { 
  signInWithPopup, 
  signInWithRedirect,
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
};

export {
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp
};

export function doc(dbInstance: any, collectionName: string, docId: string) {
  return firestoreDoc(dbInstance, collectionName, docId);
}

export function collection(dbInstance: any, collectionName: string) {
  return firestoreCollection(dbInstance, collectionName);
}

export async function getDoc(docRef: any) {
  const snap = await firestoreGetDoc(docRef);
  return {
    id: snap.id,
    exists: () => snap.exists(),
    data: () => snap.data() as any
  };
}

export async function getDocs(queryRef: any) {
  const snap = await firestoreGetDocs(queryRef);
  return {
    empty: snap.empty,
    size: snap.size,
    docs: snap.docs.map(d => ({
      id: d.id,
      data: () => d.data() as any
    })),
    forEach: (callback: (doc: any) => void) => {
      snap.docs.forEach(d => {
        callback({
          id: d.id,
          data: () => d.data() as any
        });
      });
    }
  };
}

export function runTransaction<T>(dbInstance: any, updateFunction: (transaction: any) => Promise<T>, options?: any): Promise<T> {
  return firestoreRunTransaction(dbInstance, updateFunction, options);
}

export function setDoc(docRef: any, data: any, options?: any) {
  if (options) {
    return firestoreSetDoc(docRef, data, options);
  }
  return firestoreSetDoc(docRef, data);
}

export function updateDoc(docRef: any, data: any) {
  return firestoreUpdateDoc(docRef, data);
}

export function addDoc(collectionRef: any, data: any) {
  return firestoreAddDoc(collectionRef, data);
}

export function deleteDoc(docRef: any) {
  return firestoreDeleteDoc(docRef);
}

export function query(collectionRef: any, ...constraints: any[]) {
  return firestoreQuery(collectionRef, ...constraints);
}

export function where(field: string, op: any, val: any) {
  return firestoreWhere(field, op, val);
}

export function orderBy(field: string, direction: 'asc' | 'desc' = 'asc') {
  return firestoreOrderBy(field, direction);
}

export function onSnapshot(docOrQueryRef: any, callback: (snapshot: any) => void, errorCallback?: (err: any) => void) {
  return firestoreOnSnapshot(docOrQueryRef, (snap: any) => {
    // Check if it's a query snapshot or a doc snapshot
    if (snap.docs !== undefined) {
      callback({
        empty: snap.empty,
        size: snap.size,
        docs: snap.docs.map((d: any) => ({
          id: d.id,
          data: () => d.data() as any
        })),
        forEach: (c: (doc: any) => void) => {
          snap.docs.forEach((d: any) => {
            c({
              id: d.id,
              data: () => d.data() as any
            });
          });
        }
      });
    } else {
      callback({
        id: snap.id,
        exists: () => snap.exists(),
        data: () => snap.data() as any
      });
    }
  }, errorCallback);
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  // Firebase exceptions and paths can contain account identifiers. Never log
  // or return raw provider messages, email addresses, UIDs, or identity data.
  const rawCode = (error as any)?.code;
  const code = typeof rawCode === 'string'
    ? rawCode.slice(0, 80).replace(/[^a-zA-Z0-9_.-]/g, '')
    : 'unknown';
  const rawMessage = error instanceof Error ? error.message : '';
  const collection = typeof path === 'string' ? path.split('/')[0].slice(0, 64) : null;
  const safeInfo = {
    code: code || 'unknown',
    operationType,
    collection,
  };

  if (
    code === 'unavailable' ||
    rawMessage.toLowerCase().includes('unavailable') ||
    rawMessage.toLowerCase().includes('offline')
  ) {
    console.warn('Firestore is temporarily unavailable; local features may remain available.', safeInfo);
    return;
  }

  console.error('Firestore operation failed.', safeInfo);
  throw new Error(JSON.stringify({
    ...safeInfo,
    error: 'Cloud data operation failed. Please retry. If the problem continues, contact support.'
  }));
}

// Safe connection check for Firestore
async function testConnection() {
  if (typeof window === 'undefined') return;
  try {
    const testDocRef = doc(db, 'test', 'connection');
    await firestoreGetDoc(testDocRef);
  } catch (error: any) {
    if (error?.code === 'unavailable' || error?.message?.includes('unavailable')) {
      console.warn("Firestore operating in offline/cached mode.");
    }
  }
}
testConnection();

// Safe legacy sandbox stubs to prevent immediate compilation crashes
export function subscribeToOtps(listener: any) {
  return () => {};
}

export async function sendEmailOtp(email: string) {
  throw new Error("Sandbox Email OTP was removed. Please use direct password authorization or Google Sign-In.");
}

export async function verifyEmailOtp(email: string, code: string, profession?: string) {
  throw new Error("Sandbox Email OTP was removed. Please use direct password authorization or Google Sign-In.");
}
