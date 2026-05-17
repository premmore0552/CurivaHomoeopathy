import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { userService, UserProfile } from '../services/userService';

export function useUser() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userProfile = await userService.getProfile(user.uid);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleBookmark = async (postId: string) => {
    if (!profile) return;
    await userService.toggleBookmark(postId);
    const updatedProfile = await userService.getProfile(profile.uid);
    setProfile(updatedProfile);
  };

  const addToHistory = async (postId: string) => {
    if (!profile) return;
    await userService.addToHistory(postId);
    const updatedProfile = await userService.getProfile(profile.uid);
    setProfile(updatedProfile);
  };

  return { profile, loading, toggleBookmark, addToHistory };
}
