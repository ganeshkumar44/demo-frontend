// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../action/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
