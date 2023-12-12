import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addStepperFontSize: localStorage.getItem('fontSize'),

    addStepperFontColorValue: localStorage.getItem('fontColorValue'),

    addStepperViewPortFontWeight: localStorage.getItem('viewPortFontWeight'),

    addStepperViewPortBgColor: localStorage.getItem('ViewPortBgColor'),

    addStepperViewPortHeight: localStorage.getItem('viewPortHeight'),

    addStepperKirtan: '',

    addStepperShortCutsObject: {},
};

export const addStepperSlice = createSlice({
    name: 'addStepperSlice',
    initialState,
    reducers: {
        setAddStepperFontSize: (state, action) => {
            state.addStepperFontSize = action.payload;
        },
        setAddStepperFontColorValue: (state, action) => {
            state.addStepperFontColorValue = action.payload;
        },
        setAddStepperViewPortFontWeight: (state, action) => {
            state.addStepperViewPortFontWeight = action.payload;
        },
        setAddStepperViewPortBgColor: (state, action) => {
            state.addStepperViewPortBgColor = action.payload;
        },
        setAddStepperViewPortHeight: (state, action) => {
            state.addStepperViewPortHeight = action.payload;
        },
        setAddStepperKirtan: (state, action) => {
            state.addStepperKirtan = action.payload;
        },
        setAddStepperShortCutsObject: (state, action) => {
            let index = action.payload[0];
            let shortCut = action.payload[1];
            state.addStepperShortCutsObject[index] = shortCut;
        },
        setAddStepperKirtanSlice: (state, action) => {
            for (let i = 0; i < action.payload; i++) {
                state.addStepperShortCutsObject[i] = null;
            }
        },
        setAddStepperShortCutsNewObject: (state, action) => {
            state.addStepperShortCutsObject = action.payload;
        }
    },
});

export const { setAddStepperFontSize, setAddStepperFontColorValue, setAddStepperViewPortFontWeight, setAddStepperViewPortBgColor, setAddStepperViewPortHeight, setAddStepperKirtan, setAddStepperShortCutsObject, setAddStepperKirtanSlice, setAddStepperShortCutsNewObject } = addStepperSlice.actions;

export default addStepperSlice.reducer;