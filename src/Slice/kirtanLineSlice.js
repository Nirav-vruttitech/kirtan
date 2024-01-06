import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currIndex: 0,
};

export const KirtanIndexSlice = createSlice({
  name: "KirtanIndex",
  initialState,
  reducers: {
    setCurrIndex: (state, action) => {
      state.currIndex = action.payload;
    },
  },
});

export const { setCurrIndex } = KirtanIndexSlice.actions;

export default KirtanIndexSlice.reducer;
