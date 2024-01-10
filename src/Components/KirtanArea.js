/* eslint-disable*/
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/Page.css";
import { setCurrKirtanIndex, setKirtanIndex } from "../Slice/KirtanIndexSlice";
import IndexedDBService from "../Utils/DBConfig";

const KirtanArea = () => {
  const dispatch = useDispatch();

  const [favLines, setFavLines] = useState([]);

  const [kirtanData, setKirtanData] = useState({});

  const [currLineIndex, setCurrLineIndex] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [hoveredFavLineIndex, setHoveredFavLineIndex] = useState(null);

  const [hoveredRegularLineIndex, setHoveredRegularLineIndex] = useState(null);

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const fontFamily = useSelector((state) => state.settings.fontFamily);

  const kirtanLineId = useSelector((state) => state.kirtanIndex.currIndex);

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const handleRegularLineHover = (index) => setHoveredRegularLineIndex(index);

  const handleFavLineHover = (index) => setHoveredFavLineIndex(index);

  const handleCurrLineIndex = (index) => {
    setCurrLineIndex(index);
    dispatch(setCurrKirtanIndex(index));
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();

      if (event.key) {
        const favId = favLines[Number(event.key) - 1];
        if (favId !== undefined) handleCurrLineIndex(favId);
        return;
      }

      switch (event.key) {
        case "ArrowUp":
          if (currLineIndex > 0) handleCurrLineIndex(currLineIndex - 1);
          break;
        case "ArrowDown":
          if (currLineIndex < getKirtanById()?.content?.length - 1)
            handleCurrLineIndex(currLineIndex + 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [favLines]);

  const getKirtanById = () => {
    return (
      kirtanData.length > 0 &&
      kirtanData.find((kirtan) => kirtan.id === selectedIndex)
    );
  };

  useEffect(() => {
    if (kirtanId) setSelectedIndex(Number(kirtanId));
  }, [kirtanId]);

  useEffect(() => {
    if (kirtanLineId) handleCurrLineIndex(kirtanLineId);
  }, [kirtanLineId]);

  useEffect(() => {
    isDbInitialized &&
      IndexedDBService.getAllData().then((data) => setKirtanData(data));
  }, [isDbInitialized]);

  useEffect(() => {
    const currKirtanData = getKirtanById();
    if (currKirtanData && currKirtanData.favLines)
      setFavLines(currKirtanData.favLines);
  }, [kirtanId, kirtanData]);

  return (
    <div className="p-3 flex flex-col bg-gray-100 w-auto h-screen lineBackground mt-16">
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

      <Box className="flex w-full justify-between gap-10">
        <div
          className="container flex items-center flex-col text-center p-4 text-4xl shadow overflow-y-auto overflow-x-hidden bg-[#ede5d4] h-[75vh] w-1/2"
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
                  onMouseEnter={() => handleRegularLineHover(index)}
                  onMouseLeave={() => handleRegularLineHover(null)}
                >
                  <div
                    className="justify-center items-center w-full grid grid-cols-3"
                    style={{ gridTemplateColumns: "1fr 35fr 1fr" }}
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
                    <div
                      className="cursor-grab m-1 text-3xl text-center"
                      style={{ fontFamily: fontFamily }}
                      key={index + 1}
                      onClick={() => handleCurrLineIndex(index)}
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
          {favLines && favLines.length > 0 && (
            <>
              {favLines.map((line, index) => {
                return (
                  <Stack
                    className="m-1 py-[1px] w-full grid grid-cols-3 justify-between items-center"
                    style={{
                      gridTemplateColumns: "1fr 1fr 1fr",
                    }}
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    onMouseEnter={() => handleFavLineHover(line)}
                    onMouseLeave={() => handleFavLineHover(null)}
                    key={index}
                  >
                    <Box
                      className={`${index < 9 ? "opacity-100" : "opacity-0"}`}
                    >
                      <Button
                        className="m-1"
                        style={{
                          display: "inline",
                          fontFamily: "ROBOTO",
                          textTransform: "none",
                        }}
                        variant="contained"
                      >
                        {index + 1}
                      </Button>
                    </Box>
                    <div
                      className="cursor-grab m-1 text-3xl text-center"
                      style={{ fontFamily: fontFamily }}
                    >
                      <Markdown>{getKirtanById().content[line]}</Markdown>
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
            </>
          )}
        </div>
      </Box>
    </div>
  );
};

export default KirtanArea;
