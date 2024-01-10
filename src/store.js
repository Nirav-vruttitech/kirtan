import { configureStore } from "@reduxjs/toolkit";
import viewPortSlice from "./Slice/plateSlice";

import KirtanIndex from "./Slice/KirtanIndexSlice";
import DBConfig from "./Slice/dbSlice";
import settings from "./Slice/settingsSlice";

export const store = configureStore({
  reducer: {
    viewPort: viewPortSlice,
    kirtanIndex: KirtanIndex,
    db: DBConfig,
    settings: settings,
  },
});
