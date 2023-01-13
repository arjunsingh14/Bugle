import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
};
/*slice contains the type, the initial state and all its reducers which
into the store along with other reducers*/
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload;
      state.token = action.payload.token;
    },
  },
});
export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
