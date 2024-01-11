/* eslint-disable*/
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/Page.css";
import {
  setCurrKirtanIndex,
  setKirtanIndex,
  setShortcutIndex,
} from "../Slice/KirtanIndexSlice";
import IndexedDBService from "../Utils/DBConfig";
import { ReactSortable } from "react-sortablejs";

const KirtanArea = () => {
  const dispatch = useDispatch();

  const [favLines, setFavLines] = useState([]);

  const [lineHistory, setLineHistory] = useState([]);

  const [kirtanData, setKirtanData] = useState({});

  const [currLineIndex, setCurrLineIndex] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [usedShortcut, setUsedShortcut] = useState(null);

  const [hoveredFavLineIndex, setHoveredFavLineIndex] = useState(null);

  const [hoveredRegularLineIndex, setHoveredRegularLineIndex] = useState(null);

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const fontFamily = useSelector((state) => state.settings.fontFamily);

  const kirtanLineId = useSelector((state) => state.kirtanIndex.currIndex);

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const isSettingsOpen = useSelector((state) => state.settings.open);

  const shortcutIndex = useSelector((state) => state.kirtanIndex.shortcutIndex);

  const handleRegularLineHover = (index) => setHoveredRegularLineIndex(index);

  const handleFavLineHover = (index) => setHoveredFavLineIndex(index);

  const handleCurrLineIndex = (index) => {
    setCurrLineIndex(index);
    dispatch(setCurrKirtanIndex(index));
  };

  const handleLineHistory = (line) => {
    let history = lineHistory.length > 0 ? [...lineHistory] : [];

    // Remove the existing entry if the line is already in the history
    const existingIndex = history.indexOf(line);
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }

    if (history.length > 9) history.shift();

    history.push(line);

    let kirtanData = { ...getKirtanById() };
    kirtanData.lineHistory = history;

    setLineHistory(history);

    if (isDbInitialized) {
      IndexedDBService.updateItem(kirtanData)
        .then(() => {})
        .catch((error) => console.error(error));
    }
  };

  const handleFavLines = (id) => {
    let favoriteLines = favLines.length > 0 ? [...favLines] : [];
    if (favoriteLines.includes(id))
      favoriteLines = favLines.filter((lineId) => lineId !== id);
    else favoriteLines = [...favLines, id];

    setFavLines(favoriteLines);

    let currKirtanData = { ...getKirtanById() };

    currKirtanData.favLines = favoriteLines;

    isDbInitialized &&
      IndexedDBService.updateItem(currKirtanData)
        .then(() => {})
        .catch((error) => console.error(error));
  };

  const getKirtanById = () => {
    return (
      kirtanData.length > 0 &&
      kirtanData.find((kirtan) => kirtan.id === kirtanId)
    );
  };

  const getUpdatedList = (data) => {
    const filteredIds = data.map((ele) => {
      delete ele.chosen;
      return Number(ele);
    });
    setFavLines(filteredIds);

    let currKirtanData = { ...getKirtanById() };

    currKirtanData.favLines = filteredIds;

    isDbInitialized &&
      IndexedDBService.updateItem(currKirtanData)
        .then(() => {})
        .catch((error) => console.error(error));
  };

  const handleClearHistory = () => {
    setLineHistory([]);
    let kirtanData = { ...getKirtanById() };
    kirtanData.lineHistory = [];
    isDbInitialized &&
      IndexedDBService.updateItem(kirtanData)
        .then(() => {})
        .catch((error) => console.error(error));
  };

  const handleHistorySwitch = (isForward) => {
    const index = lineHistory.findIndex((line) => line === currLineIndex);

    if (index === -1) return;

    const nextLine = lineHistory[isForward ? index + 1 : index - 1];

    if (nextLine === undefined) return;
    handleCurrLineIndex(nextLine);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();

      // enable this if shortcut assigned line have to be highlighted in the main lines
      // if (
      //   event.key !== "ArrowUp" &&
      //   event.key !== "ArrowDown" &&
      //   event.key !== "ArrowLeft" &&
      //   event.key !== "ArrowRight" &&
      //   event.key !== "q" &&
      //   event.key !== "1" &&
      //   event.key !== "2" &&
      //   event.key !== "3" &&
      //   event.key !== "4" &&
      //   event.key !== "5" &&
      //   event.key !== "6" &&
      //   event.key !== "7" &&
      //   event.key !== "8" &&
      //   event.key !== "9"
      // ) {
      // const favId = favLines[Number(event.key) - 1];
      // if (favId !== undefined) handleCurrLineIndex(favId);
      //   return;
      // }

      if (!isSettingsOpen) {
        const isShortcutPressed = !isNaN(Number(event.key));

        if (isShortcutPressed && favLines.length >= Number(event.key)) {
          setUsedShortcut(Number(event.key));
          dispatch(setShortcutIndex(favLines[Number(event.key) - 1]));
        }

        switch (event.key) {
          case "ArrowUp":
            if (currLineIndex > 0) {
              handleLineHistory(currLineIndex);
              handleCurrLineIndex(currLineIndex - 1);
              setUsedShortcut(null);
              dispatch(setShortcutIndex(null));
            }
            break;
          case "ArrowDown":
            if (currLineIndex < getKirtanById()?.content?.length - 1) {
              handleLineHistory(currLineIndex);
              handleCurrLineIndex(currLineIndex + 1);
              setUsedShortcut(null);
              dispatch(setShortcutIndex(null));
            }
            break;

          case "ArrowLeft":
            handleHistorySwitch(false);
            setUsedShortcut(null);
            dispatch(setShortcutIndex(null));
            break;

          case "ArrowRight":
            handleHistorySwitch(true);
            setUsedShortcut(null);
            dispatch(setShortcutIndex(null));
            break;

          case "q":
            handleClearHistory();
            break;

          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [favLines, isSettingsOpen, currLineIndex]);

  useEffect(() => {
    if (kirtanId && kirtanId != selectedIndex)
      setSelectedIndex(Number(kirtanId));
  }, [kirtanId]);

  useEffect(() => {
    if (kirtanLineId) handleCurrLineIndex(kirtanLineId);
  }, [kirtanLineId]);

  useEffect(() => {
    isDbInitialized &&
      IndexedDBService.getAllData().then((data) => setKirtanData(data));
  }, [isDbInitialized]);

  useEffect(() => {
    isDbInitialized &&
      IndexedDBService.getData(Number(selectedIndex)).then((data) => {
        setFavLines(data.favLines);
        setLineHistory(data.lineHistory);
      });
  }, [selectedIndex, isDbInitialized]);

  return (
    <div className="py-3 flex flex-col bg-gray-100 w-full h-screen lineBackground mt-16">
      <Box className="flex w-full overflow-x-auto overflow-y-hidden pb-2 items-center justify-center gap-3">
        {Object.keys(kirtanData).map((key, index) => {
          const id = kirtanData[key].id;
          return (
            <Box
              key={index}
              style={{
                backgroundColor: selectedIndex == id ? "#2196f3" : "#ffffff",
                color: selectedIndex == id ? "#ffffff" : "#000000",
              }}
              className="flex justify-center items-center text-xl cursor-pointer px-6 py-1.5 rounded-md shadow-md select-none font-medium capitalize transition-all duration-300 ease-in-out"
              onClick={() => {
                setSelectedIndex(id);
                dispatch(setKirtanIndex(id));
              }}
            >
              {kirtanData[key].title}
            </Box>
          );
        })}
      </Box>

      <Box className="flex w-full justify-between gap-10 px-3">
        <div
          className="container flex items-center flex-col text-center py-4 text-4xl shadow overflow-y-auto overflow-x-hidden bg-[#ede5d4] h-[75vh] w-1/2"
          style={{ fontFamily: fontFamily }}
        >
          {getKirtanById() &&
            getKirtanById().content.length > 0 &&
            getKirtanById().content.map((line, index) => {
              return (
                <Stack
                  className={`m-1 py-[1px] px-4 w-full flex justify-center items-center transition-all duration-300 ease-in-out ${
                    currLineIndex === index
                      ? "bg-slate-50 bg-opacity-70"
                      : "bg-inherit"
                  }`}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  key={index}
                  onMouseEnter={() => handleRegularLineHover(index)}
                  onMouseLeave={() => handleRegularLineHover(null)}
                >
                  <div
                    className="justify-center items-center w-full grid grid-cols-3"
                    style={{ gridTemplateColumns: "1fr 35fr 1fr" }}
                  >
                    <div
                      className={`inline transition-all duration-300 ease-in-out ${
                        currLineIndex === index ? "opacity-100" : "opacity-0"
                      } `}
                    >
                      <i
                        className="fa-solid fa-hand-point-right text-3xl"
                        style={{ color: "#3170dd" }}
                      ></i>{" "}
                    </div>
                    <div
                      className="cursor-grab m-1 text-3xl text-center"
                      style={{ fontFamily: fontFamily }}
                      key={index + 1}
                      onClick={() => {
                        handleLineHistory(currLineIndex);
                        handleCurrLineIndex(index);
                        setUsedShortcut(null);
                        dispatch(setShortcutIndex(null));
                      }}
                    >
                      <Markdown>{line}</Markdown>
                    </div>

                    <div
                      className={`text-xl font-semibold ${
                        hoveredRegularLineIndex === index
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      {hoveredRegularLineIndex === index &&
                      favLines &&
                      !favLines.includes(index) ? (
                        <IconButton onClick={() => handleFavLines(index)}>
                          <i className="fa-solid fa-plus"></i>
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleFavLines(index)}>
                          <i className="fa-solid fa-minus"></i>
                        </IconButton>
                      )}
                    </div>
                  </div>
                </Stack>
              );
            })}
        </div>

        <div
          className="container flex items-center flex-col text-center p-4 text-4xl shadow overflow-y-auto overflow-x-hidden bg-[#ede5d4] h-[75vh] w-1/2"
          style={{ fontFamily: fontFamily }}
        >
          <ReactSortable
            list={favLines}
            setList={getUpdatedList}
            className="w-full"
            handle=".drag-handle"
          >
            {favLines.map((line, index) => {
              return (
                <Stack
                  className={`m-1 py-[1px] w-full grid grid-cols-3 justify-between items-center transition-all duration-300 ease-in-out ${
                    usedShortcut - 1 === index
                      ? "bg-slate-50 bg-opacity-70"
                      : "bg-inherit"
                  }`}
                  style={{
                    gridTemplateColumns: "1fr 1fr 1fr",
                  }}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  onMouseEnter={() => handleFavLineHover(line)}
                  onMouseLeave={() => handleFavLineHover(null)}
                  onClick={() => {
                    // handleCurrLineIndex(line);
                    setUsedShortcut(index + 1);
                    dispatch(setShortcutIndex(line));
                  }}
                  key={index}
                >
                  <Box className="flex items-center justify-center">
                    <Box
                      className={`${
                        index < 9 ? "opacity-100" : "opacity-0"
                      } w-20`}
                    >
                      <Button
                        sx={{
                          height: "30px",
                          minWidth: "40px",
                        }}
                        size="small"
                        variant="contained"
                      >
                        {index + 1}
                      </Button>
                    </Box>

                    <Box
                      className={`text-sm drag-handle cursor-grab bg-inherit hover:bg-inherit ${
                        hoveredFavLineIndex === line
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <i className="fa-solid fa-grip-vertical text-base"></i>
                    </Box>
                  </Box>
                  <div
                    className="m-1 text-3xl text-center cursor-pointer"
                    style={{ fontFamily: fontFamily }}
                  >
                    <Markdown>{getKirtanById()?.content?.[line]}</Markdown>
                  </div>

                  <div
                    className={`text-xl font-semibold ${
                      hoveredFavLineIndex === line ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {hoveredFavLineIndex === line &&
                    !favLines.includes(line) ? (
                      <IconButton onClick={() => handleFavLines(line)}>
                        <i className="fa-solid fa-plus"></i>
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleFavLines(line)}>
                        <i className="fa-solid fa-minus"></i>
                      </IconButton>
                    )}
                  </div>
                </Stack>
              );
            })}
          </ReactSortable>
        </div>
      </Box>
    </div>
  );
};

export default KirtanArea;
