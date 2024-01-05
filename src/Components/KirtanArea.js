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

const KirtanArea = ({ toShowOnDisplay, showInPlate }) => {
  const dispatch = useDispatch();

  const [lines, setLines] = useState([]);

  const [showingLineState, setShowingLineState] = useState(
    lines.indexOf(toShowOnDisplay)
  );

  const [shortCutValue, setShortCutValue] = useState(null);

  const [selectedButton, setSelectedButton] = useState(null);

  const [shortCutArrayValueStore, setShortCutValueArrayValueStore] = useState(
    []
  );

  const [shortCuts, SetShortCuts] = useState({});

  const kirtan = useSelector((state) => state.kirtan.kirtan);

  const shortcutsData = useSelector((state) => state.kirtan.shortCut);

  const fontFamily = useSelector((state) => state.kirtan.fontFamily);

  const addStepperShortCutsObject = useSelector(
    (state) => state.addStepperSlice.addStepperShortCutsObject
  ) || { 1: null };

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();
      let indexOFLine = lines.indexOf(toShowOnDisplay);

      if (event.key === "Backspace" || event.key === "Delete")
        showInPlate(null);

      if (event.altKey && event.key)
        for (const key in shortCuts)
          if (shortCuts[key] === `Alt+${event.key}`) showInPlate(lines[key]);

      if (event.ctrlKey && event.key)
        for (const key in shortCuts)
          if (shortCuts[key] === `Ctr+${event.key}`) showInPlate(lines[key]);

      if (event.key)
        for (const key in shortCuts)
          if (shortCuts[key] === `${event.key}`) showInPlate(lines[key]);

      switch (event.key) {
        case "ArrowLeft":
          if (indexOFLine === 0) break;
          else showInPlate(lines[indexOFLine - 1]);
          break;
        case "ArrowRight":
          if (indexOFLine === lines.length - 1) break;
          else showInPlate(lines[indexOFLine + 1]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  const handleShowButton = (index) => setSelectedButton(index);

  const handleShortCutInput = (event) =>
    setShortCutValue(shortCutArrayValueStore.join(" + "));

  const handleData = (index) => {
    const shortCutStringValue = shortCutValue === "" ? null : shortCutValue;
    dispatch(setAddStepperShortCutsObject([index, shortCutStringValue]));
    setShortCutValue(null);
    setShortCutValueArrayValueStore([]);
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
        for (const key in addStepperShortCutsObject)
          if (addStepperShortCutsObject[key] === `Alt+${event.key}`)
            showInPlate(lines[key]);

      if (event.ctrlKey && event.key)
        for (const key in addStepperShortCutsObject)
          if (addStepperShortCutsObject[key] === `Ctr+${event.key}`)
            showInPlate(lines[key]);

      if (event.key)
        for (const key in addStepperShortCutsObject)
          if (addStepperShortCutsObject[key] === `${event.key}`)
            showInPlate(lines[key]);

      // Arrow key handler
      let indexOFLine = lines.indexOf(toShowOnDisplay);
      switch (event.key) {
        case "ArrowUp":
          if (indexOFLine > 0) showInPlate(lines[indexOFLine - 1]);
          break;
        case "ArrowDown":
          if (indexOFLine < lines.length - 1)
            showInPlate(lines[indexOFLine + 1]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    toShowOnDisplay,
    shortCutArrayValueStore,
    lines,
    addStepperShortCutsObject,
  ]);

  useEffect(() => {
    const splitLines = kirtan.split("\n").filter((line) => line.trim() !== "");
    setLines(splitLines);
  }, [kirtan]);

  useEffect(() => {
    showInPlate(lines[0]);
  }, [lines]);

  useEffect(() => {
    setShowingLineState(lines.indexOf(toShowOnDisplay));
  }, [toShowOnDisplay]);

  useEffect(() => {
    if (shortcutsData && Object.keys(shortcutsData).length > 0) {
      SetShortCuts(shortcutsData);
    }
  }, [shortcutsData]);

  return (
    <div className="p-3 place-self-center bg-gray-100 w-auto h-screen lineBackground">
      <div
        className="container mt-16 flex items-center flex-col text-center p-4 text-4xl shadow overflow-y-auto overflow-x-hidden bg-[#ede5d4] lineContainer"
        style={{ fontFamily: fontFamily }}
      >
        {lines.length > 0 &&
          lines.map((line, index) => {
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
                      showingLineState === index ? "opacity-100" : "opacity-0"
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
                    onClick={() => showInPlate(line)}
                  >
                    <Markdown>{line}</Markdown>
                  </p>

                  {addStepperShortCutsObject[index] !== null &&
                  addStepperShortCutsObject[index] !== undefined &&
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
                        {addStepperShortCutsObject[index]}
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