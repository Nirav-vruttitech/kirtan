import { configureStore } from "@reduxjs/toolkit";
import viewPortSlice from "./Slice/plateSlice";
import addStepperSlice from "./Slice/addStepperSlice";
import kirtan from "./Slice/kirtanSlice";
import KirtanIndex from "./Slice/KirtanIndexSlice";
import DBConfig from "./Slice/dbSlice";
import settings from "./Slice/settingsSlice";

export const store = configureStore({
  reducer: {
    viewPort: viewPortSlice,
    addStepperSlice: addStepperSlice,
    kirtan: kirtan,
    kirtanIndex: KirtanIndex,
    db: DBConfig,
    settings: settings,
  },
});
