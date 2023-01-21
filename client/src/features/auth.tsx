import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface state {
  email: string | null;
  token: string | null;
  register: boolean;
  topHeadlines: object[];
  country: string;
  sources: string[];
  filteredHeadlines: object[];
}
const user = window.localStorage.getItem("user");
const token = window.localStorage.getItem("token");
const sources = window.localStorage.getItem("sources");
let loggedUser: string | null = null;
let  parsedSources: string[] = [];
if (user && token) {
  loggedUser = JSON.parse(user);
  if (sources) {
    parsedSources = JSON.parse(sources);
  }
}
const initialState: state = {
  email: loggedUser,
  token: token || null,
  register: true,
  topHeadlines: [],
  country: "us",
  sources:  parsedSources,
  filteredHeadlines: [],
};

const baseUrl = "/api/v1";

export const fetchArticles = createAsyncThunk("fetchArticles", async () => {
  try {
    const res = await axios(baseUrl + "/articles");
    const data = res.data;
    console.log(data);
    return data.articles;
  } catch (error) {
    console.log(error);
  }
});
export const fetchSources = createAsyncThunk(
  "fetchSources",
  async (arg, { getState }) => {
    try {
      const state: any = getState();
      const sources = state.reducer.sources;
      console.log(sources);
      const res = await axios(baseUrl + "/articles/" + sources.join(","));
      const data = res.data;
      return data.articles;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateSources = createAsyncThunk(
  "updateSources",
  async (arg, { getState }) => {
    try {
      const state: any = getState();
      const config = {
        headers: { Authorization: state.auth.token },
      };
      const sources = state.auth.sources;
      const res = await axios.patch(baseUrl + "/articles", { sources }, config);
      return res.data;
    } catch (error) {}
  }
);

/*slice contains the type, the initial state and all its reducers which
into the store along with other reducers*/
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state: state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    regOrLog: (state, action) => {
      state.register = action.payload.isReg;
    },
    setToken: (state: state, action) => {
      state.token = `bearer ${action.payload.token}` as string;
    },
    changeCountry: (state, action) => {
      state.country = action.payload.country;
    },
    setSource: (state, action) => {
      state.sources = action.payload.sources;
      window.localStorage.setItem("sources", JSON.stringify(state.sources));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.topHeadlines = action.payload;
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.filteredHeadlines = action.payload;
      })
      .addCase(updateSources.fulfilled, (state, action) => {
        state.sources = action.payload;
      })
      .addCase(updateSources.rejected, (state, action) => {
        state = initialState;
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
      });
  },
});

export const { changeCountry, setSource, regOrLog, setToken, loginUser } =
  authSlice.actions;
export default authSlice.reducer;
