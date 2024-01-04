import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import AddKirtanStepper from "./Components/AddKirtanStepper";
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
  const fontFamily = useSelector(state => state.kirtan.fontFamily);

  const [toShowOnDisplay, setToShowOnDisplay] = useState('');

  const showInPlate = (line) => { setToShowOnDisplay(line); };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/edit" element={<AddKirtanStepper />} />
          <Route path="/input" element={<AddKirtanStepper />} />
          <Route path="/" element={
            <>
              <Navbar />
              <Page toShowOnDisplay={toShowOnDisplay} showInPlate={showInPlate} />
              <Plate toShowOnDisplay={toShowOnDisplay} backgroundColor={ViewPortBgColor} height={viewPortHeight} color={fontColorValue} fontSize={fontSize} fontWeight={viewPortFontWeight} fontFamily={fontFamily} />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
