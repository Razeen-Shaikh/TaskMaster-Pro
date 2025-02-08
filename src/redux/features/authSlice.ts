import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setLoading, setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;
