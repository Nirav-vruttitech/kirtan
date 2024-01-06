import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currIndex: 0,
  kirtanId: 0,
};

export const KirtanIndexSlice = createSlice({
  name: "KirtanIndex",
  initialState,
  reducers: {
    setCurrKirtanIndex: (state, action) => {
      state.currIndex = action.payload;
    },
    setKirtanIndex: (state, action) => {
      state.kirtanId = action.payload;
    },
  },
});

export const { setCurrKirtanIndex, setKirtanIndex } = KirtanIndexSlice.actions;

export default KirtanIndexSlice.reducer;
