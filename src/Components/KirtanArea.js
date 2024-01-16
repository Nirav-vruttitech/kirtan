/* eslint-disable*/
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrKirtanIndex,
  setKirtanIndex,
  setShortcutIndex,
} from "../Slice/KirtanIndexSlice";
import IndexedDBService from "../Utils/DBConfig";
import { ReactSortable } from "react-sortablejs";
import KirtanLinePlate from "./KirtanLinePlate";
import { useNavigate } from "react-router-dom";
import { setSettingsOpen } from "../Slice/settingsSlice";
import SettingModal from "./SettingModal";
import SwitchComp from "./Switch";

const KirtanArea = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [isLive, setIsLive] = useState(false);

  const [favLines, setFavLines] = useState([]);

  const [kirtanData, setKirtanData] = useState({});

  const [lineHistory, setLineHistory] = useState([]);

  const [currLineIndex, setCurrLineIndex] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [usedShortcut, setUsedShortcut] = useState(null);

  const [hoverKirtanIndex, setHoverKirtanIndex] = useState(null);

  const [hoveredFavLineIndex, setHoveredFavLineIndex] = useState(null);

  const [hoveredRegularLineIndex, setHoveredRegularLineIndex] = useState(null);

  const isSettingsOpen = useSelector((state) => state.settings.open);

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const fontFamily = useSelector((state) => state.settings.fontFamily);

  const kirtanLineId = useSelector((state) => state.kirtanIndex.currIndex);

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const isDualLineMode = useSelector((state) => state.settings.isDualLineMode);

  const handleRegularLineHover = (index) => setHoveredRegularLineIndex(index);

  const handleFavLineHover = (index) => setHoveredFavLineIndex(index);

  const handleModalToggle = (value) => {
    dispatch(setSettingsOpen(value));
    setOpen(value);
  };

  const handleCurrLineIndex = (index) => {
    setCurrLineIndex(index);
    dispatch(setCurrKirtanIndex(index));
  };

  const handleChange = async (x) => {
    const res = await handleVMixInput(x);
    res && setIsLive(x);
    res && localStorage.setItem("isLive", JSON.stringify(x));
  };

  const handleVMixInput = async (flag) => {
    let vmixSettings = localStorage.getItem("vmixSettings");

    if (vmixSettings) {
      vmixSettings = JSON.parse(vmixSettings);
      for (const key in vmixSettings)
        if (vmixSettings.hasOwnProperty(key))
          if (!vmixSettings[key]) return false;

      let func = "OverlayInput";

      if (flag) func = func + vmixSettings.overlayChannelId + "In";
      else func = func + vmixSettings.overlayChannelId + "Out";

      let url = `${vmixSettings.webControllerUrl}/api/?Function=${func}&input=${vmixSettings.inputId}`;
      try {
        await fetch(url, { mode: "no-cors" });
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  const handleLineHistory = (line) => {
    let history = lineHistory.length > 0 ? [...lineHistory] : [];

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

  const handleKey = async (event) => {
    if (!isSettingsOpen) {
      let flag = isLive;
      if (event.key === "Escape") flag = false;
      else if (event.key === "Enter") flag = true;
      else if (event.key === " ") flag = !flag;
      else event.preventDefault();

      const res = await handleVMixInput(flag);

      localStorage.setItem("isLive", JSON.stringify(flag));

      res && setIsLive(flag);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();
      if (!isSettingsOpen) {
        const isShortcutPressed = !isNaN(Number(event.key));

        if (isShortcutPressed && favLines.length >= Number(event.key)) {
          setUsedShortcut(Number(event.key));
          dispatch(setShortcutIndex(favLines[Number(event.key) - 1]));
        }

        if (
          event.key === "Escape" ||
          event.key === "Enter" ||
          event.key === " "
        ) {
          handleKey(event);
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

    !isSettingsOpen && window.addEventListener("keydown", handleKeyPress);
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

  useEffect(() => {
    const body = document.querySelector("body");

    body.style.overflow = "hidden";

    return () => (body.style.overflow = "auto");
  }, []);

  return (
    <div
      className="py-3 flex flex-col justify-between bg-gray-100 w-full lineBackground relative"
      style={{
        height: "calc(100vh)",
      }}
    >
      <Box className="flex flex-col w-full justify-center items-center absolute">
        <Box className="flex w-full justify-between px-3">
          <Box className="flex w-full overflow-x-auto overflow-y-hidden pb-2 items-center gap-3">
            {Object.keys(kirtanData).map((key, index) => {
              const id = kirtanData[key].id;
              return (
                <Box
                  key={index}
                  style={{
                    backgroundColor:
                      selectedIndex == id ? "#2196f3" : "#ffffff",
                    color: selectedIndex == id ? "#ffffff" : "#000000",
                  }}
                  onMouseEnter={() => setHoverKirtanIndex(id)}
                  onMouseLeave={() => setHoverKirtanIndex(null)}
                  className="gap-2 flex justify-center items-center text-xl cursor-pointer px-3 py-1.5 rounded-md shadow-md select-none font-medium capitalize transition-all duration-300 ease-in-out"
                  onClick={() => {
                    setSelectedIndex(id);
                    dispatch(setKirtanIndex(id));
                  }}
                >
                  {kirtanData[key].title}
                  <Box
                    className={`text-base ${
                      hoverKirtanIndex === id ? "opacity-100" : "opacity-0"
                    } duration-300 ease-in-out transition-all`}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      dispatch(setKirtanIndex(id));
                      navigate(`/edit/${id}`);
                    }}
                  >
                    <i class="fa-solid fa-pencil"></i>
                  </Box>
                </Box>
              );
            })}
            <Box
              className="text-xl hover:bg-gray-300 p-2 h-10 flex items-center justify-center rounded-md duration-300 ease-in-out transition-all cursor-pointer"
              onClick={() => {
                navigate("/input");
              }}
            >
              <i class="fa-solid fa-plus"></i>
            </Box>
          </Box>
          <Box className="flex justify-center items-center gap-3">
            <SwitchComp checked={isLive} handleChange={handleChange} />
            <Box
              className="flex items-center justify-center cursor-pointer hover:bg-gray-300 p-2 h-10 rounded-md duration-300 ease-in-out transition-all"
              onClick={() => {
                handleModalToggle(true);
              }}
              aria-label="open drawer"
            >
              <i className="fa-solid fa-gear fa-lg"></i>
            </Box>
          </Box>

          <SettingModal open={open} handleModalToggle={handleModalToggle} />
        </Box>

        <Box
          className={`flex w-full justify-between gap-10 px-3 h-[90vh] ${
            isDualLineMode
              ? "max-h-[calc(100vh-280px)]"
              : "max-h-[calc(100vh-230px)]"
          } `}
        >
          <div
            className="container flex items-center flex-col text-center py-4 text-4xl shadow overflow-y-auto overflow-x-hidden bg-[#ede5d4]  w-1/2"
            style={{ fontFamily: fontFamily }}
          >
            {getKirtanById() &&
              getKirtanById().content.length > 0 &&
              getKirtanById().content.map((line, index) => {
                return (
                  <Stack
                    className={`px-4 w-full flex justify-center items-center transition-all duration-300 ease-in-out cursor-pointer ${
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
                        className="text-2xl text-center"
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
            className="container flex items-center flex-col text-center p-4 text-4xl shadow overflow-y-auto overflow-x-hidden bg-[#ede5d4]  w-1/2"
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
                    className={`w-full grid grid-cols-3 justify-between items-center transition-all duration-300 ease-in-out ${
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
                      className="text-2xl text-center cursor-pointer"
                      style={{ fontFamily: fontFamily }}
                    >
                      <Markdown>{getKirtanById()?.content?.[line]}</Markdown>
                    </div>

                    <div
                      className={`text-xl font-semibold ${
                        hoveredFavLineIndex === line
                          ? "opacity-100"
                          : "opacity-0"
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
      </Box>
      <Box className="absolute bottom-0 w-full">
        <KirtanLinePlate />
      </Box>
    </div>
  );
};

export default KirtanArea;
