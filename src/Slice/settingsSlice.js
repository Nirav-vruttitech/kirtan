import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backgroundColor: "#000",
  color: "#FFF",
  fontFamily: "Guj_Gopika_Two",
  fontSize: "40px",
  fontWeight: "500",
  height: "80px",
  textShadowColor: "#FFF",
  textShadowWidth: "0px",
  open: false,
  isDualLineMode: false,
  preSettings: [],
  selectedId: 1,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPreSettings: (state, action) => {
      state.preSettings = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
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
    setSettingsOpen: (state, action) => {
      state.open = action.payload;
    },
    setIsDualLineMode: (state, action) => {
      state.isDualLineMode = action.payload;
    },
  },
});

export const {
  setPreSettings,
  updatePreSettings,
  setSelectedId,
  setBgColor,
  setColor,
  setFontFamily,
  setFontSize,
  setFontWeight,
  setHeight,
  setTextShadowColor,
  setTextShadowWidth,
  setSettingsOpen,
  setIsDualLineMode,
} = settingsSlice.actions;

export default settingsSlice.reducer;
