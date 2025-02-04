import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { AppDispatch } from "../store";
import { logoutUser, setUser } from "../features/authSlice";

export const monitorAuthState = () => (dispatch: AppDispatch) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } else {
      dispatch(logoutUser());
    }
  });
};
