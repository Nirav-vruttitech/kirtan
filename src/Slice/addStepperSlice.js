import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addStepperFontSize: localStorage.getItem('fontSize') || '70px',

    addStepperFontColorValue: localStorage.getItem('fontColorValue') || '#FFFFFF',

    addStepperViewPortFontWeight: localStorage.getItem('viewPortFontWeight'),

    addStepperViewPortBgColor: localStorage.getItem('ViewPortBgColor') || '#000000',

    addStepperViewPortHeight: localStorage.getItem('viewPortHeight') || '86px',

    fontFamilt: localStorage.getItem('fontFamily') || 'G_BEJOD_4',

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
        setFontFamily: (state, action) => {
            state.fontFamilt = action.payload;
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

export const { setAddStepperFontSize, setAddStepperFontColorValue, setAddStepperViewPortFontWeight, setAddStepperViewPortBgColor, setFontFamily, setAddStepperViewPortHeight, setAddStepperKirtan, setAddStepperShortCutsObject, setAddStepperKirtanSlice, setAddStepperShortCutsNewObject } = addStepperSlice.actions;

export default addStepperSlice.reducer;