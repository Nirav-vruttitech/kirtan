import { configureStore } from "@reduxjs/toolkit";
import viewPortSlice from "./Slice/plateSlice";
import addStepperSlice from "./Slice/addStepperSlice";

export const store = configureStore({
    reducer: {
        viewPort: viewPortSlice,
        addStepperSlice: addStepperSlice,
    },
});