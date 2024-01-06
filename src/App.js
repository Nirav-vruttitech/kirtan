import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddKirtanStepper from "./Components/AddKirtan";
import KirtanLinePlate from "./Components/KirtanLinePlate";
import Navbar from "./Components/Navbar";
import KirtanArea from "./Components/KirtanArea";
import "./App.css";
import IndexedDBService from "./Utils/DBConfig";
import { setDbStatus } from "./Slice/dbSlice";

function App() {
  const ViewPortBgColor = useSelector(
    (state) => state.viewPort.ViewPortBgColor
  );

  const viewPortFontWeight = useSelector(
    (state) => state.viewPort.viewPortFontWeight
  );

  const dispatch = useDispatch();

  const fontSize = useSelector((state) => state.viewPort.fontSize);

  const fontFamily = useSelector((state) => state.kirtan.fontFamily);

  const viewPortHeight = useSelector((state) => state.viewPort.viewPortHeight);

  const fontColorValue = useSelector((state) => state.viewPort.fontColorValue);

  const [toShowOnDisplay, setToShowOnDisplay] = useState("");

  const showInPlate = (line) => setToShowOnDisplay(line);

  useEffect(() => {
    IndexedDBService.initDB()
      .then(() => dispatch(setDbStatus(true)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit/:id" element={<AddKirtanStepper />} />
        <Route path="/input" element={<AddKirtanStepper />} />
        <Route
          path="/"
          element={
            <React.Fragment>
              <Navbar />
              <KirtanArea
                toShowOnDisplay={toShowOnDisplay}
                showInPlate={showInPlate}
              />
              <KirtanLinePlate
                toShowOnDisplay={toShowOnDisplay}
                backgroundColor={ViewPortBgColor}
                height={viewPortHeight}
                color={fontColorValue}
                fontSize={fontSize}
                fontWeight={viewPortFontWeight}
                fontFamily={fontFamily}
              />
            </React.Fragment>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
