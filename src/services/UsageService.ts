import { auth, db, doc, getDoc, updateDoc, increment, serverTimestamp } from '../lib/firebase';

const FREE_LIMIT = 5;
const PREMIUM_REMEDY_LIMIT = 100; // Effectively "unlimited" for UI selection
const FREE_REMEDY_LIMIT = 5;
const LOCAL_STORAGE_KEY = 'curiva_comparison_count';

export interface UsageStatus {
  count: number;
  limitReached: boolean;
  isPremium: boolean;
  maxRemedies: number;
  lastResetDate: string | null;
}

export async function setPremiumStatus(isPremium: boolean): Promise<UsageStatus> {
  const user = auth.currentUser;
  
  if (user) {
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      isPremium: isPremium,
      updatedAt: serverTimestamp()
    });
    return getComparisonUsage();
  }

  // For non-logged in users, we can store it in local storage for demo purposes
  localStorage.setItem('curiva_is_premium', isPremium.toString());
  return getComparisonUsage();
}

export async function getComparisonUsage(): Promise<UsageStatus> {
  const today = new Date().toISOString().split('T')[0];
  return {
    count: 0,
    isPremium: true,
    limitReached: false,
    maxRemedies: PREMIUM_REMEDY_LIMIT,
    lastResetDate: today
  };
}

export async function incrementComparisonCount(): Promise<UsageStatus> {
  const today = new Date().toISOString().split('T')[0];
  return {
    count: 0,
    isPremium: true,
    limitReached: false,
    maxRemedies: PREMIUM_REMEDY_LIMIT,
    lastResetDate: today
  };
}
