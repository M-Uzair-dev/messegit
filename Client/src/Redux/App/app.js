import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/userSlice";

export const store = configureStore({
  reducer: userSlice,
});
