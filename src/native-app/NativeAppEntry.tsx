import React, { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { auth, onAuthStateChanged, signOut } from '../lib/firebase';
import NativeLearningApp, { type NativeAccountInfo, type NativeAudience } from './NativeLearningApp';
import NativeAuthScreen from './NativeAuthScreen';
import {
  clearNativeProgress,
  prepareNativeAccountProgress,
  prepareNativeGuestProgress,
  startNativeProgressSync,
  type NativeProgressSyncStatus,
} from './nativeProgressSync';
import './native-v2.css';

function readAudience(): NativeAudience {
  try {
    return localStorage.getItem('curiva-native-audience') === 'practitioner'
      ? 'practitioner'
      : 'student';
  } catch {
    return 'student';
  }
}

function readOfflineMode(): boolean {
  try {
    return localStorage.getItem('curiva-native-access-mode') === 'offline';
  } catch {
    return false;
  }
}

export default function NativeAppEntry() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [offlineMode, setOfflineMode] = useState(readOfflineMode);
  const [showAuth, setShowAuth] = useState(!readOfflineMode());
  const [audience, setAudience] = useState<NativeAudience>(readAudience);
  const [progressSyncStatus, setProgressSyncStatus] = useState<NativeProgressSyncStatus>('idle');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      if (nextUser) prepareNativeAccountProgress(nextUser.uid);
      setUser(nextUser);
      setAuthReady(true);

      if (nextUser) {
        try {
          localStorage.removeItem('curiva-native-access-mode');
        } catch {
          // Authentication remains valid when local preferences cannot be cleared.
        }
        setOfflineMode(false);
        setShowAuth(false);
      } else {
        const guest = readOfflineMode();
        setOfflineMode(guest);
        setShowAuth(!guest);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setProgressSyncStatus('idle');
      return;
    }

    return startNativeProgressSync(user.uid, setProgressSyncStatus);
  }, [user?.uid]);

  const handleContinueOffline = () => {
    prepareNativeGuestProgress();
    try {
      localStorage.setItem('curiva-native-access-mode', 'offline');
    } catch {
      // Offline mode remains available for this session.
    }
    setOfflineMode(true);
    setShowAuth(false);
  };

  const handleAuthenticated = (selectedAudience: NativeAudience) => {
    try {
      localStorage.setItem('curiva-native-audience', selectedAudience);
      localStorage.removeItem('curiva-native-access-mode');
    } catch {
      // Session state remains valid without local preferences.
    }
    setAudience(selectedAudience);
    setOfflineMode(false);
    setUser(auth.currentUser);
    setShowAuth(false);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    try {
      localStorage.removeItem('curiva-native-access-mode');
    } catch {
      // Sign-out is complete even if optional local cleanup fails.
    }
    setUser(null);
    setOfflineMode(false);
    setShowAuth(true);
  };

  const handleResetProgress = async () => {
    // Signed-in users clear the Firestore snapshot as well as their device cache.
    // Guest/offline users clear only the guest namespace on this device.
    await clearNativeProgress(user?.uid || null);
  };

  if (!authReady) {
    return (
      <div className="native-entry-loading">
        <img src="/curiva-native-mark.svg" alt="" />
        <strong>Curiva</strong>
        <span>Preparing your learning space…</span>
      </div>
    );
  }

  if (user) {
    const account: NativeAccountInfo = {
      displayName: user.displayName || user.email?.split('@')[0] || 'Curiva learner',
      email: user.email || '',
      audience,
      progressSyncStatus,
    };
    return <NativeLearningApp account={account} onSignOut={handleSignOut} onResetProgress={handleResetProgress} />;
  }

  if (offlineMode && !showAuth) {
    return <NativeLearningApp onManageAccount={() => setShowAuth(true)} onResetProgress={handleResetProgress} />;
  }

  return (
    <NativeAuthScreen
      onAuthenticated={handleAuthenticated}
      onContinueOffline={handleContinueOffline}
    />
  );
}
