import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStepper from "./Components/AddStepper";
import Plate from './Components/Plate';
import Navbar from './Components/Navbar';
import Page from './Components/Page';
import EditTextArea from './Components/EditTextArea';
import './App.css';

function App() {

  const [originalKirtan, setOriginalKirtan] = useState(JSON.parse(localStorage.getItem('originalKirtan')));

  // const [originalKirtan, setOriginalKirtan] = useState(`
  // áâÕ×ë ÕâÔí áâÕ×ë, Á#Ó áâÕ×ë, áâÍëÔí »íÔ ÕâÔí ÍâÛ×ë,
  // áâÍ×ë ÕâÔí áâÍ×ë, áâÌïÊ áâÍ×ë, Óï½ÅâÌä ÓëÔçï ÕâÛ×ë...Ãë»
  //  ÚãÓ áâÕÈâï Á áïÁÕâÛçï »Ó×ë, #Åïç #Í ËÓäÌë ÑÌ ÚÓ×ë,
  //  ’ëÈâï ÁnÑ ÖÎÛ ÑâÓí Éâ×ë ÕâÔÑ‘...Óï½Åâ0 1
  // ÕâÔí ÖïÈí-ÐkÈíÌë Öç¼ áâÍ×ë, ÚâÉ ÔâïÏâ »ÓäÌë ÚãÓ ÐëÃ×ë,
  //  ÐÕíÐÕÌä Èë ÍäÅâ ÑëÃ×ë ÕâÔÑ‘...Óï½Åâ0 2
  // ÊèËë ¿ÓÇ ËíæÌë Íè’ »Ó×çï, »Óä áâÓÈäÌë ÚìÒë #Í ËÓ×çï,
  //  #Åâï ÐíÁÌ ÁÑâÅä Óâ‘ »Ó×çï ÕâÔÑ‘...Óï½Åâ0 3
  // ÕâÔí ÖâËçÌí sÕâï½ áï½ë ËÓ×ë, ÑäÄä ÑäÄä ÑíÚÌ ÕâÈí »Ó×ë,
  //  ÍýëÑë ÍïãkÈÑâï ÍäÓÖÕâ ÎÓ×ë ÕâÔÑ‘...Óï½Åâ0 4
  // ÏÚíÛâ Ï½ä¿ë ÏâÍÌë ÂçÔâÕ×çï, ÖÊâ ÖâÉë ÓÚëÕâÌë ÖÑ’Õ×çï,
  //  ÞâÌ‘ÕÌ »Úë ½çÇ ½â×çï ÕâÔÑ‘...Óï½Åâ0 5`);

  const showInPlate = (line) => {
    setToShowOnDisplay(line);
  };

  const [toShowOnDisplay, setToShowOnDisplay] = useState('');

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/Edit" element={<EditTextArea setOriginalKirtan={setOriginalKirtan} originalKirtan={originalKirtan} />} /> */}
          <Route path="/edit" element={<AddStepper />} />
          <Route path="/input" element={<AddStepper />} />
          <Route path="/" element={
            <React.Fragment>
              <Navbar />
              <Page showInPlate={showInPlate} toShowOnDisplay={toShowOnDisplay} originalKirtan={originalKirtan} />
              <Plate toShowOnDisplay={toShowOnDisplay} />
            </React.Fragment>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
