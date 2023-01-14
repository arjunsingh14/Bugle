import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/";

const initialState = {
  topHeadlines: [],
  country: "us",
  sources: [],
  filteredHeadlines: [],
};

export const fetchArticles = createAsyncThunk(
  "article/fetchArticles",
  async () => {
    try {
      const res = await axios(baseUrl + "/articles");
      const data = res.data;
      console.log(data);
      return data.articles;
    } catch (error) {
      console.log(error);
    }
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    changeCountry: (state, action) => {
        state.country = action.payload.country
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.topHeadlines = action.payload;
    });
  },
});

export default articleSlice.reducer;
