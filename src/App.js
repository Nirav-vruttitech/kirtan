import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddKirtanStepper from "./Components/AddKirtan";
import KirtanArea from "./Components/KirtanArea";
import { setDbStatus } from "./Slice/dbSlice";
import IndexedDBService, { tblPreSetting } from "./Utils/DBConfig";
import PreSetting from "./Utils/PreSetting.json";

function App() {
  const dispatch = useDispatch();
  const [preSetting, setPreSetting] = useState();

  useEffect(() => {
    IndexedDBService.initDB()
      .then(() => {
        dispatch(setDbStatus(true));
        const transaction = IndexedDBService.db.transaction([tblPreSetting], "readonly");
        const objectStore = transaction.objectStore(tblPreSetting);
        const countRequest = objectStore.count();

        countRequest.onsuccess = function () {
          const count = countRequest.result;
          if (count === 0 && preSetting) {
            IndexedDBService.addItem(preSetting, tblPreSetting)
              .then(() => console.log("add pre setting data success"))
              .catch((error) => console.error(error));
          } else {
            // dispatch(setPreSettings(PreSetting));
            console.log(`${tblPreSetting} is not empty. Total : ${count}`);
          }
        };
      })
      .catch((error) => console.error(error));

    if (!preSetting) {
      setPreSetting((prev) => ({ ...prev, id: 1, settings: [...PreSetting] }));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit/:id" element={<AddKirtanStepper />} />
        <Route path="/input" element={<AddKirtanStepper />} />
        <Route path="/" element={<KirtanArea />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
