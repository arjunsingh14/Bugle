import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  username: "",
  token: ""
};

interface authPayload {
  username: string;
  token: string;
}

interface authAction {
  type: string;
  payload: authPayload;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  }
});


export default authSlice.reducer

