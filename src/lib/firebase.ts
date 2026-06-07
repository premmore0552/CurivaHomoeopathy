// Mock/Local Storage Database and Auth Engine
// Fully offline, fast, and robust client-side storage engine

export const db = 'local_db';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

// Global active auth/user state
export const auth = {
  currentUser: null as any,
  _authStateListeners: [] as Function[],
  onAuthStateChanged(listener: (user: any) => void) {
    this._authStateListeners.push(listener);
    // Trigger immediately with current user state
    setTimeout(() => listener(this.currentUser), 0);
    return () => {
      this._authStateListeners = this._authStateListeners.filter(l => l !== listener);
    };
  },
  updateCurrentUser(user: any) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem('homepath_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('homepath_user');
    }
    this._authStateListeners.forEach(listener => listener(user));
  }
};

// Immediately load existing session from local storage on boot
const savedUser = localStorage.getItem('homepath_user');
if (savedUser) {
  try {
    auth.currentUser = JSON.parse(savedUser);
  } catch (e) {
    auth.currentUser = null;
  }
}

export class GoogleAuthProvider {}
export const googleProvider = new GoogleAuthProvider();

export class RecaptchaVerifier {
  constructor(...args: any[]) {}
  clear() {}
  render() { return Promise.resolve(1); }
}

// Authentication Service Functions
export function onAuthStateChanged(authInstance: any, listener: (user: any) => void) {
  return auth.onAuthStateChanged(listener);
}

export async function signOut(authInstance: any) {
  auth.updateCurrentUser(null);
}

export async function signInWithPopup(authInstance: any, provider: any) {
  const user = {
    uid: 'google_user_123',
    email: 'student.homeopathy@scholar.org',
    displayName: 'Scholar Homeopath',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    emailVerified: true
  };
  auth.updateCurrentUser(user);
  
  // Prefill user profile
  await setDoc({ collection: 'users', id: user.uid }, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    profession: 'student',
    bookmarks: [],
    readingHistory: [],
    activities: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  return { user };
}

export async function signInWithEmailAndPassword(authInstance: any, email: string, _pass: string) {
  const regUsers = JSON.parse(localStorage.getItem('homepath_registered_users') || '{}');
  const saved = regUsers[email.toLowerCase()];
  if (!saved) {
    // Graceful auto-registration or fallback for testing ease, let's throw if not registered or do auto-log for dummy passwords
    throw new Error('User account not found. Please Register an account first.');
  }
  const user = {
    uid: saved.uid,
    email: saved.email,
    displayName: saved.displayName,
    photoURL: saved.photoURL || '',
    emailVerified: true
  };
  auth.updateCurrentUser(user);
  return { user };
}

export async function createUserWithEmailAndPassword(authInstance: any, email: string, _pass: string) {
  const regUsers = JSON.parse(localStorage.getItem('homepath_registered_users') || '{}');
  if (regUsers[email.toLowerCase()]) {
    throw new Error('Email already in use.');
  }
  const uid = 'uid_' + Math.random().toString(36).substring(2, 11);
  const newUser = {
    uid,
    email,
    displayName: email.split('@')[0],
    photoURL: '',
    emailVerified: true
  };
  regUsers[email.toLowerCase()] = newUser;
  localStorage.setItem('homepath_registered_users', JSON.stringify(regUsers));
  
  auth.updateCurrentUser(newUser);
  return { user: newUser };
}

export async function updateProfile(userInstance: any, profile: { displayName?: string, photoURL?: string }) {
  if (auth.currentUser) {
    const updated = {
      ...auth.currentUser,
      ...profile
    };
    auth.updateCurrentUser(updated);
  }
}

export async function signInWithPhoneNumber(authInstance: any, phoneNumber: string, recaptcha: any) {
  return {
    verificationId: 'mock_verification_id_' + Math.random().toString(36).substring(2, 9),
    confirm: async (code: string) => {
      const user = {
        uid: 'uid_' + Math.random().toString(36).substring(2, 9),
        phone: phoneNumber,
        email: phoneNumber.replace(/\s+/g, '') + '@phone.local',
        displayName: 'Homeopath Phone User',
        photoURL: '',
        emailVerified: true
      };
      
      // Save phone user to standard storage
      const regUsers = JSON.parse(localStorage.getItem('homepath_registered_users') || '{}');
      regUsers[user.email.toLowerCase()] = user;
      localStorage.setItem('homepath_registered_users', JSON.stringify(regUsers));
      
      auth.updateCurrentUser(user);
      return { user };
    }
  };
}

// ------------------- Local Storage database -------------------
const getLocalCollection = (collectionName: string): Record<string, any> => {
  const data = localStorage.getItem(`homepath_db_${collectionName}`);
  if (!data) return {};
  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
};

const setLocalCollection = (collectionName: string, data: Record<string, any>) => {
  localStorage.setItem(`homepath_db_${collectionName}`, JSON.stringify(data));
};

// Doc refs
export function doc(dbInstance: any, collectionName: string, docId: string) {
  return { _type: 'doc', collection: collectionName, id: docId };
}

export function collection(dbInstance: any, collectionName: string) {
  return { _type: 'collection', name: collectionName };
}

export async function getDoc(docRef: any) {
  const col = getLocalCollection(docRef.collection);
  const data = col[docRef.id];
  return {
    exists: () => !!data,
    id: docRef.id,
    data: () => data
  };
}

export async function getDocFromServer(docRef: any) {
  return getDoc(docRef);
}

// Set & update operations with responsive sync notifying any list snapshot listeners
export async function setDoc(docRef: any, data: any) {
  const col = getLocalCollection(docRef.collection);
  col[docRef.id] = { ...data };
  setLocalCollection(docRef.collection, col);
  triggerListeners(docRef.collection, docRef.id);
}

export async function updateDoc(docRef: any, data: any) {
  const col = getLocalCollection(docRef.collection);
  let current = col[docRef.id] || {};
  
  for (const key of Object.keys(data)) {
    const val = data[key];
    if (key.includes('.')) {
      const parts = key.split('.');
      let obj = current;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!obj[parts[i]]) obj[parts[i]] = {};
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = processFieldValue(val, obj[parts[parts.length - 1]]);
    } else {
      current[key] = processFieldValue(val, current[key]);
    }
  }
  col[docRef.id] = current;
  setLocalCollection(docRef.collection, col);
  triggerListeners(docRef.collection, docRef.id);
}

// Special Firestore fields operators
export function arrayUnion(...elements: any[]) {
  return { _type: 'arrayUnion', elements };
}

export function arrayRemove(...elements: any[]) {
  return { _type: 'arrayRemove', elements };
}

export function increment(n: number) {
  return { _type: 'increment', value: n };
}

export function serverTimestamp() {
  return { _type: 'serverTimestamp' };
}

function processFieldValue(val: any, existing: any) {
  if (val && typeof val === 'object') {
    if (val._type === 'arrayUnion') {
      const arr = Array.isArray(existing) ? [...existing] : [];
      val.elements.forEach((el: any) => {
        const strEl = JSON.stringify(el);
        if (!arr.some(item => JSON.stringify(item) === strEl)) {
          arr.push(el);
        }
      });
      return arr;
    }
    if (val._type === 'arrayRemove') {
      const arr = Array.isArray(existing) ? [...existing] : [];
      val.elements.forEach((el: any) => {
        const strEl = JSON.stringify(el);
        const index = arr.findIndex(item => JSON.stringify(item) === strEl);
        if (index > -1) arr.splice(index, 1);
      });
      return arr;
    }
    if (val._type === 'increment') {
      const count = typeof existing === 'number' ? existing : 0;
      return count + val.value;
    }
    if (val._type === 'serverTimestamp') {
      return new Date().toISOString();
    }
  }
  return val;
}

// Appending documents
export async function addDoc(collectionRef: any, data: any) {
  const id = 'doc_' + Math.random().toString(36).substring(2, 11);
  const docRef = { _type: 'doc', collection: collectionRef.name, id };
  
  // Handle serverTimestamp placeholder on creation
  const docData: any = {};
  for (const k of Object.keys(data)) {
    if (data[k] && data[k]._type === 'serverTimestamp') {
      docData[k] = new Date().toISOString();
    } else {
      docData[k] = data[k];
    }
  }
  
  await setDoc(docRef, { ...docData, id });
  return docRef;
}

// Deleting documents
export async function deleteDoc(docRef: any) {
  const col = getLocalCollection(docRef.collection);
  if (col && col[docRef.id]) {
    delete col[docRef.id];
    setLocalCollection(docRef.collection, col);
    triggerListeners(docRef.collection, docRef.id);
  }
}

// Queries structures & execution
export function query(collectionRef: any, ...constraints: any[]) {
  return { _type: 'query', collection: collectionRef.name, constraints };
}

export function where(field: string, op: string, val: any) {
  return { _type: 'where', field, op, val };
}

export function orderBy(field: string, direction: 'asc' | 'desc' = 'asc') {
  return { _type: 'orderBy', field, direction };
}

export async function getDocs(queryOrCol: any) {
  const isQuery = queryOrCol._type === 'query';
  const collectionName = isQuery ? queryOrCol.collection : queryOrCol.name;
  const col = getLocalCollection(collectionName);
  
  let docs = Object.keys(col).map(id => ({
    id,
    data: () => col[id]
  }));
  
  if (isQuery) {
    const constraints = queryOrCol.constraints || [];
    // Filters
    const wheres = constraints.filter((c: any) => c && c._type === 'where');
    for (const w of wheres) {
      docs = docs.filter(doc => {
        const data = doc.data();
        if (!data) return false;
        const fieldVal = data[w.field];
        if (w.op === '==') return fieldVal === w.val;
        if (w.op === '>=') return fieldVal >= w.val;
        if (w.op === '<=') return fieldVal <= w.val;
        if (w.op === 'array-contains') return Array.isArray(fieldVal) && fieldVal.includes(w.val);
        return true;
      });
    }
    // Sorting
    const orderBys = constraints.filter((c: any) => c && c._type === 'orderBy');
    if (orderBys.length > 0) {
      const order = orderBys[0];
      docs.sort((a, b) => {
        const valA = a.data()?.[order.field];
        const valB = b.data()?.[order.field];
        if (valA === valB) return 0;
        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;
        if (order.direction === 'desc') {
          return valA < valB ? 1 : -1;
        } else {
          return valA > valB ? 1 : -1;
        }
      });
    }
  }
  
  return {
    docs,
    empty: docs.length === 0,
    size: docs.length,
    forEach: (callback: (doc: any) => void) => {
      docs.forEach(callback);
    }
  };
}

// Live subscription pub/sub implementation
const listeners = new Map<string, Set<(snap: any) => void>>();

export function onSnapshot(docRef: any, callback: (snapshot: any) => void, errorCallback?: (err: any) => void) {
  const path = `${docRef.collection}/${docRef.id}`;
  if (!listeners.has(path)) {
    listeners.set(path, new Set());
  }
  listeners.get(path)!.add(callback);
  
  // Fire initial callback
  getDoc(docRef).then(callback).catch(errorCallback);
  
  return () => {
    const set = listeners.get(path);
    if (set) {
      set.delete(callback);
      if (set.size === 0) {
        listeners.delete(path);
      }
    }
  };
}

function triggerListeners(collectionName: string, docId: string) {
  const path = `${collectionName}/${docId}`;
  const list = listeners.get(path);
  if (list) {
    getDoc({ collection: collectionName, id: docId }).then(snap => {
      list.forEach(cb => cb(snap));
    });
  }
}

// Error handlers
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  console.error('[MockFirestore] Simulated Firestore error details for tracking:', error, operationType, path);
  throw error;
}
