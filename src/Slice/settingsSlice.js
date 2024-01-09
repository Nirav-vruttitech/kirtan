import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backgroundColor: "#000",
  color: "#FFF",
  fontFamily: "Guj_Simple_Normal",
  fontSize: "40px",
  fontWeight: "500",
  height: "80px",
  textShadowColor: "#FFF",
  textShadowWidth: "0px",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setBgColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontWeight: (state, action) => {
      state.fontWeight = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setTextShadowColor: (state, action) => {
      state.textShadowColor = action.payload;
    },
    setTextShadowWidth: (state, action) => {
      state.textShadowWidth = action.payload;
    },
  },
});

export const {
  setBgColor,
  setColor,
  setFontFamily,
  setFontSize,
  setFontWeight,
  setHeight,
  setTextShadowColor,
  setTextShadowWidth,
} = settingsSlice.actions;

export default settingsSlice.reducer;
