import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserNew = createAsyncThunk(
  "userNew/fetchUserNew",
  async (token) => {
    const response = await axios.get(`http://localhost:5000/api/userNew`,
    {
      headers: {
        Authorization: token,
      },
    }
    );

    return response.data;
  }
);
const userNewSlice = createSlice({
  name: "userNew",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNew.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserNew.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserNew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});

export default userNewSlice.reducer;


