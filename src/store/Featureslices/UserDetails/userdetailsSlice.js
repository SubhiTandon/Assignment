import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doGet } from "../../api";
import location from "../../location";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  uservalue: {},
};

export const getuserDetails = createAsyncThunk(
  "getuserDetails",
  async (data, thunkAPI) => {
    return await doGet(thunkAPI, location.GET_USERDETAILS, {}, data?.token);
  }
);

export const userdetailsSlice = createSlice({
  name: "userdetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getuserDetails.pending, (state) => {
        state.pending = true;
      })
      .addCase(getuserDetails.fulfilled, (state, action) => {
        state.pending = false;
        state.uservalue = action.payload;
      })
      .addCase(getuserDetails.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});


export const { increment, decrement, incrementByAmount } =
  userdetailsSlice.actions;

export default userdetailsSlice.reducer;
