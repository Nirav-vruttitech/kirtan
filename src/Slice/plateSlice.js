import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fontSize: localStorage.getItem("fontSize") || "70px",

  fontColorValue: localStorage.getItem("fontColorValue") || "#FFFFFF",

  viewPortFontWeight: localStorage.getItem("viewPortFontWeight"),

  ViewPortBgColor: localStorage.getItem("ViewPortBgColor") || "#000000",

  viewPortHeight: localStorage.getItem("viewPortHeight") || "86px",
};

export const viewPortSlice = createSlice({
  name: "viewPort",
  initialState,
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontColorValue: (state, action) => {
      state.fontColorValue = action.payload;
    },
    setViewPortFontWeight: (state, action) => {
      state.viewPortFontWeight = action.payload;
    },
    setViewPortBgColor: (state, action) => {
      state.ViewPortBgColor = action.payload;
    },
    setViewPortHeight: (state, action) => {
      state.viewPortHeight = action.payload;
    },
  },
});

export const {
  setFontSize,
  setFontColorValue,
  setViewPortFontWeight,
  setViewPortBgColor,
  setViewPortHeight,
} = viewPortSlice.actions;

export default viewPortSlice.reducer;
