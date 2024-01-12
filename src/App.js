import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddKirtanStepper from "./Components/AddKirtan";
import KirtanArea from "./Components/KirtanArea";
import Navbar from "./Components/Navbar";
import { setDbStatus } from "./Slice/dbSlice";
import IndexedDBService from "./Utils/DBConfig";

function App() {
  const dispatch = useDispatch();

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
            <Box className="flex flex-col w-full">
              <Navbar />
              <KirtanArea />
            </Box>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
