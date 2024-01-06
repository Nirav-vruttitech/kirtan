/* eslint-disable*/
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/Page.css";
import { setAddStepperShortCutsObject } from "./../Slice/addStepperSlice";
import IndexedDBService from "../Utils/DBConfig";
import { setCurrKirtanIndex } from "../Slice/KirtanIndexSlice";

const KirtanArea = ({ showInPlate }) => {
  const dispatch = useDispatch();

  const [lines, setLines] = useState([]);

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const [kirtanData, setKirtanData] = useState({});

  const [currLineIndex, setCurrLineIndex] = useState(0);

  const handleCurrLineIndex = (index) => {
    setCurrLineIndex(index);
    dispatch(setCurrKirtanIndex(index));
  };

  const [shortCutValue, setShortCutValue] = useState(null);

  const [selectedButton, setSelectedButton] = useState(null);

  const [shortCutArrayValueStore, setShortCutValueArrayValueStore] = useState(
    []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const kirtan = useSelector((state) => state.kirtan.kirtan);

  const fontFamily = useSelector((state) => state.kirtan.fontFamily);

  const addStepperShortCutsObject = useSelector(
    (state) => state.addStepperSlice.addStepperShortCutsObject
  ) || { 1: null };

  const handleShowButton = (index) => setSelectedButton(index);

  const handleShortCutInput = (event) =>
    setShortCutValue(shortCutArrayValueStore.join(" + "));

  const handleData = (index) => {
    const shortCutStringValue = shortCutValue === "" ? null : shortCutValue;
    dispatch(setAddStepperShortCutsObject([index, shortCutStringValue]));
    setShortCutValue(null);
    setShortCutValueArrayValueStore([]);
    let currKirtanData = { ...kirtanData[selectedIndex] };

    currKirtanData.shortcuts[index] = shortCutStringValue;

    IndexedDBService.updateItem(currKirtanData)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const handleEditShortcutShowButton = (index) => setSelectedButton(index);

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();

      let prevShortcuts = [...shortCutArrayValueStore];
      const keyCombination = event.key;
      const pushValue = keyCombination === "Control" ? "Ctr" : keyCombination;

      if (pushValue === "Backspace")
        prevShortcuts.splice(prevShortcuts.length - 1, 1);
      else if (!prevShortcuts.includes(pushValue)) {
        if (
          !(
            pushValue === "Shift" ||
            pushValue === "CapsLock" ||
            pushValue === "ArrowDown" ||
            pushValue === "ArrowRight" ||
            pushValue === "ArrowUp" ||
            pushValue === "ArrowLeft" ||
            pushValue === "Tab" ||
            pushValue === "Meta"
          )
        ) {
          prevShortcuts.push(pushValue);
        }
      }

      setShortCutValueArrayValueStore(prevShortcuts);
      setShortCutValue(prevShortcuts.join("+"));

      if (event.altKey && event.key)
        for (const key in kirtanData[selectedIndex]?.shortcuts)
          if (kirtanData[selectedIndex]?.shortcuts[key] == `Alt+${event.key}`)
            handleCurrLineIndex(Number(key));

      if (event.ctrlKey && event.key)
        for (const key in kirtanData[selectedIndex]?.shortcuts)
          if (kirtanData[selectedIndex]?.shortcuts[key] == `Ctr+${event.key}`)
            handleCurrLineIndex(Number(key));

      if (event.key)
        for (const key in kirtanData[selectedIndex]?.shortcuts)
          if (kirtanData[selectedIndex]?.shortcuts[key] == `${event.key}`)
            handleCurrLineIndex(Number(key));

      switch (event.key) {
        case "ArrowUp":
          if (currLineIndex > 0) {
            handleCurrLineIndex(currLineIndex - 1);
          }
          break;
        case "ArrowDown":
          if (currLineIndex < kirtanData[selectedIndex]?.content?.length - 1) {
            handleCurrLineIndex(currLineIndex + 1);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [shortCutArrayValueStore, lines, addStepperShortCutsObject]);

  const getKirtanById = () => {
    return kirtanData[selectedIndex];
  };

  useEffect(() => {
    const splitLines = kirtan.split("\n").filter((line) => line.trim() !== "");
    setLines(splitLines);
  }, [kirtan]);

  useEffect(() => {
    showInPlate(lines[0]);
  }, [lines]);

  useEffect(() => {
    isDbInitialized &&
      IndexedDBService.getAllData().then((data) => {
        setKirtanData(data);
      });
  }, [isDbInitialized]);

  return (
    <div className="p-3 place-self-center bg-gray-100 w-auto h-screen lineBackground mt-16">
      <Box className="flex w-full overflow-x-auto overflow-y-hidden pb-2 items-center justify-center gap-3">
        {Object.keys(kirtanData).map((key, index) => {
          return (
            <Box
              key={index}
              style={{
                backgroundColor: selectedIndex == key ? "#1976D2" : "#ffffff",
                color: selectedIndex == key ? "#ffffff" : "#000000",
              }}
              className="flex justify-center items-center text-2xl cursor-pointer px-6 py-1.5 rounded-lg shadow-md select-none font-semibold capitalize transition-all duration-300 ease-in-out"
              onClick={() => {
                setSelectedIndex(key);
                dispatch(setCurrKirtanIndex(key));
              }}
            >
              {kirtanData[key].title}
            </Box>
          );
        })}
      </Box>

      <div
        className="container flex items-center flex-col text-center p-4 text-4xl shadow overflow-y-auto overflow-x-hidden bg-[#ede5d4] h-[75vh]"
        style={{ fontFamily: fontFamily }}
      >
        {getKirtanById() &&
          getKirtanById().content.length > 0 &&
          getKirtanById().content.map((line, index) => {
            return (
              <Stack
                className="m-1 py-[1px] w-full flex justify-center items-center"
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                key={index}
              >
                <div
                  className="justify-center items-center w-full grid grid-cols-3"
                  style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
                >
                  <div
                    className={`inline ${
                      currLineIndex === index ? "opacity-100" : "opacity-0"
                    } `}
                  >
                    <i
                      className="fa-solid fa-hand-point-right"
                      style={{ color: "#3170dd" }}
                    ></i>{" "}
                  </div>
                  <p
                    className="cursor-grab m-1 text-3xl text-center"
                    style={{ fontFamily: fontFamily }}
                    key={index + 1}
                    onClick={() => handleCurrLineIndex(index)}
                  >
                    <Markdown>{line}</Markdown>
                  </p>

                  {getKirtanById().shortcuts[index] !== null &&
                  getKirtanById().shortcuts[index] !== undefined &&
                  selectedButton !== index ? (
                    <Box>
                      <Button
                        className="m-1"
                        style={{
                          display: "inline",
                          fontFamily: "ROBOTO",
                          textTransform: "none",
                        }}
                        variant="contained"
                        onClick={() => handleEditShortcutShowButton(index)}
                      >
                        {getKirtanById().shortcuts[index]}
                      </Button>
                    </Box>
                  ) : selectedButton === index ? (
                    <div className="flex justify-center">
                      <Input
                        value={shortCutValue}
                        placeholder="Add ShortCut"
                        onChange={handleShortCutInput}
                      />
                      <IconButton
                        onClick={() => {
                          handleShowButton(null);
                          handleData(index);
                        }}
                        size="large"
                        className="h-8 w-8 bg-none hover:bg-none"
                      >
                        <i className="fa-solid fa-check text-[#3675e2] hover:bg-none"></i>
                      </IconButton>
                    </div>
                  ) : (
                    <Box>
                      <IconButton
                        onClick={() => handleShowButton(index)}
                        size="small"
                        style={{
                          backgroundColor: "#1976D2",
                          color: "white",
                        }}
                        className="h-8 w-8"
                        color="primary"
                      >
                        <i className="fa-regular fa-plus"></i>
                      </IconButton>
                    </Box>
                  )}
                </div>
              </Stack>
            );
          })}
      </div>
    </div>
  );
};

export default KirtanArea;
