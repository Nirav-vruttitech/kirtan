import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import AddStepper from "./Components/AddStepper";
import Plate from './Components/Plate';
import Navbar from './Components/Navbar';
import Page from './Components/Page';
import './App.css';

function App() {

  const ViewPortBgColor = useSelector(state => state.viewPort.ViewPortBgColor);
  const viewPortFontWeight = useSelector(state => state.viewPort.viewPortFontWeight);
  const fontColorValue = useSelector(state => state.viewPort.fontColorValue);
  const fontSize = useSelector(state => state.viewPort.fontSize);
  const viewPortHeight = useSelector(state => state.viewPort.viewPortHeight);

  const originalKirtan = JSON.parse(localStorage.getItem('originalKirtan'));
  const [toShowOnDisplay, setToShowOnDisplay] = useState('');

  const showInPlate = (line) => {
    setToShowOnDisplay(line);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/edit" element={<AddStepper />} />
          <Route path="/input" element={<AddStepper />} />
          <Route path="/" element={
            <>
              <Navbar />
              <Page showInPlate={showInPlate} toShowOnDisplay={toShowOnDisplay} originalKirtan={originalKirtan} />
              <Plate toShowOnDisplay={toShowOnDisplay} backgroundColor={ViewPortBgColor} height={viewPortHeight} color={fontColorValue} fontSize={fontSize} fontWeight={viewPortFontWeight} />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
