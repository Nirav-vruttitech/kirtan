import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kirtan:
    JSON.parse(localStorage.getItem("kirtan")) ||
    `ÑâÓâ ÖÚ’ÌïÊ ÍýâÇ pÒâÓâ, ÑâÓä áâï¼ÅÔäÌâ ÈâÓâ,  
ÈÑë Óâ‘ ÓÚëjÒí Úë sÕâÑä, ÑâÓä ÐèÔíÌâ ÐèÔÌâÓâ...Ãë»  
ÈÑë ÑLÒâ Èí Öç¼ Àë ÂâÂçï, ÑâÓë ÚìÒë ÚìÒâÌâ ÚâÓñ  
áãÈ ÎâÕä ½Òí Àçï vÚâÔâ, ÑÌë ÑLÒí ÈÑâÓí pÒâÓ...ÈÑë0 1  
ÑÌë ÑíÃâ ÖïÈí áâpÒâ, ÑÚâ ÐkÈ ÈÇí ÌãÚ ÍâÓ,  
ÔäËâ ÁnÑ ¾Çâ Ñe vÚâÔâ, ÚÊÕâÛä ÈÑë áâ ÕâÓ...ÈÑë0 2  
»Úë ÞâÌ‘ÕÌ Úë ÍýâÇ, ÑâÓâ oeâÖ ÈÇâ áâËâÓñ  
ÈÑë Úí Èí ÚãÓÕÓ Úçï Àçï, ÈÑë áâtÑâ Àí ÚãÓ ÑâÓâ...ÈÑë0 3`,

  shortCut: JSON.parse(localStorage.getItem("shortCut")) || { 1: null },

  fontFamily: localStorage.getItem("fontFamily") || "Guj_Simple_Normal",
};

export const kirtanSlice = createSlice({
  name: "kirtan",
  initialState,
  reducers: {
    setKirtan: (state, action) => {
      state.kirtan = action.payload;
    },
    setShortCut: (state, action) => {
      state.shortCut = action.payload;
    },
    setKirtanFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
  },
});

export const { setKirtan, setShortCut, setKirtanFontFamily } =
  kirtanSlice.actions;

export default kirtanSlice.reducer;
