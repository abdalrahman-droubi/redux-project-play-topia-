import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFavGames = createAsyncThunk("favGames/fetchFavGames", async (id) => {
    try {
        console.log(id)
      const response = await axios.get(`http://localhost:5000/api/favoriteGames/${id}`);
      return response.data;
    } catch (error) {
        console.log(error);
    }
  });
  
  const favGamesSlice = createSlice(
  
    {
    name: "favGames",



    initialState: {
      loading: false,
      data: null,
      error: "",
    },


    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchFavGames.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchFavGames.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = "";
        })
        .addCase(fetchFavGames.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
          state.error = action.error.message;
        })
    },
  });
  export default favGamesSlice.reducer;