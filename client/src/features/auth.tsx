import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload);
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
  },
});
export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
