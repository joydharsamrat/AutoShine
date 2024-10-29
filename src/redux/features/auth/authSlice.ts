import { createSlice } from "@reduxjs/toolkit";
import { TUserAuth } from "../../../types";

type TAuthState = {
  user: null | TUserAuth;
  token: null | string;
};

const userData = localStorage.getItem("autoShineUser");
const tokenData = localStorage.getItem("autoShineToken");

const initialState: TAuthState = {
  user: userData ? JSON.parse(userData) : null,
  token: tokenData || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("autoShineUser", JSON.stringify(user));
      localStorage.setItem("autoShineToken", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("autoShineUser");
      localStorage.removeItem("autoShineToken");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
