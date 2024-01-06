import { configureStore } from "@reduxjs/toolkit";
import viewPortSlice from "./Slice/plateSlice";
import addStepperSlice from "./Slice/addStepperSlice";
import kirtan from "./Slice/kirtanSlice";
import KirtanIndex from "./Slice/kirtanLineSlice";

export const store = configureStore({
  reducer: {
    viewPort: viewPortSlice,
    addStepperSlice: addStepperSlice,
    kirtan: kirtan,
    kirtanIndex: KirtanIndex,
  },
});
