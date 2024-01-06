import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDbInitialized: false,
};

export const DBSlice = createSlice({
  name: "dbSlice",
  initialState,
  reducers: {
    setDbStatus: (state, action) => {
      state.isDbInitialized = action.payload;
    },
  },
});

export const { setDbStatus } = DBSlice.actions;

export default DBSlice.reducer;
