import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Markdown from "react-markdown";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import '../CSS/Page.css';

const Page = ({ toShowOnDisplay, showInPlate }) => {
  const dispatch = useDispatch();
  // array of lines that store in this
  const [lines, setLines] = useState([]);

  const [showingLineState, setShowingLineState] = useState(lines.indexOf(toShowOnDisplay));

  const [kirtan, setKirtan] = useState((useSelector(state => state.kirtan.kirtan)));

  const [shortCuts, SetShortCuts] = useState({});

  const shortcutsData = useSelector(state => state.kirtan.shortCut);
  const fontFamily = useSelector(state => state.kirtan.fontFamily);

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();
      let indexOFLine = lines.indexOf(toShowOnDisplay);

      if (event.key === "Backspace" || event.key === "Delete") {
        showInPlate(null);
      }

      if (event.altKey && event.key) {
        for (const key in shortCuts) {
          if (shortCuts[key] === `Alt+${event.key}`)
            showInPlate(lines[key]);
        }
      }

      if (event.ctrlKey && event.key) {
        for (const key in shortCuts) {
          if (shortCuts[key] === `Ctr+${event.key}`)
            showInPlate(lines[key]);
        }
      }

      if (event.key) {
        for (const key in shortCuts) {
          if (shortCuts[key] === `${event.key}`) showInPlate(lines[key]);
        }
      }

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

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect(() => {
    const splitLines = kirtan
      .split("\n")
      .filter((line) => line.trim() !== "");
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
        class="container mt-16 flex items-center flex-col text-center p-4 text-4xl shadow overflow-y-auto overflow-x-hidden bg-[#ede5d4] lineContainer"
        style={{ fontFamily: fontFamily }}
      >
        {lines.length > 0 && lines.map((line, index) => {
          return (
            <Stack
              className="m-1 py-[1px] w-full flex justify-center items-center"
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <div className="justify-center items-center w-full flex-grow">
                {showingLineState === index ? (
                  <div className="w-[150px] inline opacity-100">
                    <i
                      className="fa-solid fa-hand-point-right"
                      style={{ color: "#3170dd" }}
                    ></i>{" "}
                  </div>
                ) : (
                  <div className="w-[160px] inline opacity-0">
                    <i
                      className="fa-solid fa-hand-point-right"
                      style={{ color: "#3170dd" }}
                    ></i>{" "}
                  </div>
                )}
                <p className="cursor-grab m-1 text-3xl text-center inline-block w-[800px]" style={{ fontFamily: fontFamily }} key={index + 1} onClick={() => { showInPlate(line); }}>
                  <Markdown>
                    {line}
                  </Markdown>
                </p>
                {shortCuts[index] === null || shortCuts[index] === undefined ? (
                  <div className="w-40 h-[42px] inline">
                    <Button
                      className="cursor-pointer h-[25px] text-center pt-0 opacity-0"
                      style={{
                        display: "inline",
                        fontFamily: "ROBOTO",
                        textTransform: "none",
                      }}
                      variant="contained"
                    >
                      {shortCuts[index] ? shortCuts[index] : ""}
                    </Button>
                  </div>
                ) : (
                  <div className="w-40 h-[42px] inline">
                    <Button
                      className="cursor-pointer h-[25px] text-center pt-0"
                      style={{
                        display: "inline",
                        fontFamily: "ROBOTO",
                        textTransform: "none",
                      }}
                      variant="contained"
                    >
                      {shortCuts[index] ? shortCuts[index] : ""}
                    </Button>
                  </div>
                )}
              </div>
            </Stack>
          );
        })}
      </div>
    </div>
  );
};

export default Page;