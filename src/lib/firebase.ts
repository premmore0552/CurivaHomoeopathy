import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
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
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { 
  signInWithPopup, 
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

export function setDoc(docRef: any, data: any) {
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
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validation run for Firestore
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
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
