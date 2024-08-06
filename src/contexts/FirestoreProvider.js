import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Import Packages
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import Loader from "../components/Loader/Loader";

/**
 * Initialize our Firebase App
 */
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
});

/**
 * Create Context for Provider
 */
export const FirestoreContext = createContext();

/**
 * Hook for Firestore Context
 *
 * @returns Context
 */
export function useFirestore() {
  return useContext(FirestoreContext);
}

/**
 *
 * @param {Object} props
 * @returns
 */
export const FirestoreProvider = ({ children }) => {
  const db = getFirestore(app);

  const auth = getAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const loginAnon = async () => {
    // If user is logged in and not anonymous, return
    if (auth.currentUser && !auth.currentUser.isAnonymous) {
      return;
    }

    try {
      const { user } = await signInAnonymously(auth);
    } catch (error) {
      console.log("Error logging in: ", error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Set persistence on auth
      await setPersistence(auth, browserLocalPersistence);

      const provider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log("Error logging in: ", error);
    }
  };

  const logoutWithGoogle = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  const isAdmin = useMemo(() => {
    if (!auth.currentUser) {
      return false;
    }

    // Email contains @interactiveworkshops.com
    return (
      auth.currentUser?.email &&
      auth.currentUser.email.includes("@interactiveworkshops.com")
    );
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        loginAnon();
      }

      if (user) {
        setIsLoggedIn(true);
      }

      setCurrentUser(user);
    });

    return unsubscribe;
  }, [auth]);

  if (!isLoggedIn) {
    return <Loader message="Connecting to database…" />;
  }

  /**
   *
   */
  return (
    <FirestoreContext.Provider
      value={{
        db,
        auth,
        loginWithGoogle,
        logoutWithGoogle,
        isAdmin,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
