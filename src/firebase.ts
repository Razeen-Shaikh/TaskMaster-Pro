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
  apiKey: "AIzaSyCHZaD7wwz8mfdiuGUS8q8P44Vu0oF5aNw",
  authDomain: "task-management-ec1a5.firebaseapp.com",
  projectId: "task-management-ec1a5",
  storageBucket: "task-management-ec1a5.firebasestorage.app",
  messagingSenderId: "121249026637",
  appId: "1:121249026637:web:6dd2568d5e3a8dc3234204",
  measurementId: "G-3T96EKLJ79",
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
