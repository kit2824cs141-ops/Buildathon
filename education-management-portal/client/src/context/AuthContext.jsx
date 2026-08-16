// AuthContext.jsx — Firebase Auth state + backend profile sync
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);   // Firebase user
  const [userProfile, setUserProfile] = useState(null);   // RTDB profile
  const [role, setRole]               = useState(null);   // 'student' | 'teacher' | 'admin'
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        try {
          // Fetch the RTDB profile (which holds role, studentInfo, etc.)
          const idToken = await firebaseUser.getIdToken();
          const res = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${idToken}` },
          });
          const profile = res.data?.user || {};
          setUserProfile(profile);
          setRole(profile?.profile?.role || null);
        } catch {
          setUserProfile(null);
          setRole(null);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /** Returns the current Firebase ID token (for attaching to API requests) */
  const getToken = async () => {
    if (!currentUser) return null;
    return currentUser.getIdToken();
  };

  const logout = () => signOut(auth);

  const value = { currentUser, userProfile, role, loading, getToken, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
