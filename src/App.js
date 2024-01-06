import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AddKirtanStepper from "./Components/AddKirtan";
import KirtanLinePlate from "./Components/KirtanLinePlate";
import Navbar from "./Components/Navbar";
import KirtanArea from "./Components/KirtanArea";
import "./App.css";
import IndexedDBService from "./Utils/DbConfig";

function App() {
  const ViewPortBgColor = useSelector(
    (state) => state.viewPort.ViewPortBgColor
  );

  const viewPortFontWeight = useSelector(
    (state) => state.viewPort.viewPortFontWeight
  );

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    IndexedDBService.initDB()
      .then(() => setInitialized(true))
      .catch((error) => console.error(error));
  }, []);

  const handleAddData = () => {
    console.log("called");
    if (initialized) {
      IndexedDBService.addItem({ id: 1, name: "John Doe", age: 30 })
        .then(() => console.log("Data added"))
        .catch((error) => console.error(error));
    }
  };
  const fontSize = useSelector((state) => state.viewPort.fontSize);

  const fontFamily = useSelector((state) => state.kirtan.fontFamily);

  const viewPortHeight = useSelector((state) => state.viewPort.viewPortHeight);

  const fontColorValue = useSelector((state) => state.viewPort.fontColorValue);

  const [toShowOnDisplay, setToShowOnDisplay] = useState("");

  const showInPlate = (line) => setToShowOnDisplay(line);

  useEffect(() => {
    handleAddData();
  }, [initialized]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit" element={<AddKirtanStepper />} />
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
              {/* <AddViewPortPage /> */}
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
