import authReducer from "./auth";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
