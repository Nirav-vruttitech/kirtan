import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currIndex: 0,
  kirtanId: 0,
  shortcutIndex: null,
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
    setShortcutIndex: (state, action) => {
      state.shortcutIndex = action.payload;
    },
  },
});

export const { setCurrKirtanIndex, setKirtanIndex, setShortcutIndex } =
  KirtanIndexSlice.actions;

export default KirtanIndexSlice.reducer;
