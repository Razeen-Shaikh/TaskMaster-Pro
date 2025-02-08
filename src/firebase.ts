import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence enabled");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

const signInWithGoogle: () => Promise<User | undefined> = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User Info:", result.user);
    return result.user;
  } catch (error) {
    console.error("Google Sign-in Error:", (error as Error).message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Logout Error:", error.message);
    } else {
      console.error("Logout Error:", error);
    }
  }
};

interface AuthStateCallback {
  (user: User | null): void;
}

const checkAuthState = (callback: AuthStateCallback): void => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export { auth, signInWithGoogle, logout, checkAuthState };
