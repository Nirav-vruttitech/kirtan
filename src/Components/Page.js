import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Page = (props) => {
  // array of lines that store in this
  const [lines, setLines] = useState([]);

  const [originalKirtan, setOriginalKirtan] = useState("");

  const [showingLineState, setShowingLineState] = useState(lines.indexOf(props.toShowOnDisplay));

  const [shortCuts, SetShortCuts] = useState({});

  useEffect(() => {
    const kirtanData = JSON.parse(localStorage.getItem("originalKirtan"));
    const shortCutsObject = JSON.parse(localStorage.getItem("shortCutsObject"));
    setOriginalKirtan(kirtanData ? kirtanData : `ÑâÓâ ÖÚ’ÌïÊ ÍýâÇ pÒâÓâ, ÑâÓä áâï¼ÅÔäÌâ ÈâÓâ,
ÈÑë Óâ‘ ÓÚëjÒí Úë sÕâÑä, ÑâÓä ÐèÔíÌâ ÐèÔÌâÓâ...Ãë»
ÈÑë ÑLÒâ Èí Öç¼ Àë ÂâÂçï, ÑâÓë ÚìÒë ÚìÒâÌâ ÚâÓñ
áãÈ ÎâÕä ½Òí Àçï vÚâÔâ, ÑÌë ÑLÒí ÈÑâÓí pÒâÓ...ÈÑë0 1
ÑÌë ÑíÃâ ÖïÈí áâpÒâ, ÑÚâ ÐkÈ ÈÇí ÌãÚ ÍâÓ,
ÔäËâ ÁnÑ ¾Çâ Ñe vÚâÔâ, ÚÊÕâÛä ÈÑë áâ ÕâÓ...ÈÑë0 2
»Úë ÞâÌ‘ÕÌ Úë ÍýâÇ, ÑâÓâ oeâÖ ÈÇâ áâËâÓñ
ÈÑë Úí Èí ÚãÓÕÓ Úçï Àçï, ÈÑë áâtÑâ Àí ÚãÓ ÑâÓâ...ÈÑë0 3`);
    SetShortCuts(shortCutsObject ? shortCutsObject : { 1: null });
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();
      let indexOFLine = lines.indexOf(props.toShowOnDisplay);

      if (event.key === "Backspace" || event.key === "Delete") {
        props.showInPlate(null);
      }

      if (event.altKey && event.key) {
        for (const key in shortCuts) {
          if (shortCuts[key] === `Alt+${event.key}`)
            props.showInPlate(lines[key]);
        }
      }

      if (event.ctrlKey && event.key) {
        for (const key in shortCuts) {
          if (shortCuts[key] === `Ctr+${event.key}`)
            props.showInPlate(lines[key]);
        }
      }

      if (event.key) {
        for (const key in shortCuts) {
          if (shortCuts[key] === `${event.key}`) props.showInPlate(lines[key]);
        }
      }

      switch (event.key) {
        case "ArrowLeft":
          if (indexOFLine === 0) break;
          else props.showInPlate(lines[indexOFLine - 1]);
          break;
        case "ArrowRight":
          if (indexOFLine === lines.length - 1) break;
          else props.showInPlate(lines[indexOFLine + 1]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [props]);

  useEffect(() => {
    const splitLines = originalKirtan
      .split("\n")
      .filter((line) => line.trim() !== "");
    setLines(splitLines);
  }, [originalKirtan]);

  useEffect(() => {
    props.showInPlate(lines[0]);
  }, [lines]);

  useEffect(() => {
    setShowingLineState(lines.indexOf(props.toShowOnDisplay));
  }, [props.toShowOnDisplay]);

  return (
    <div
      className="p-3 place-self-center bg-gray-100 w-auto"
      style={{ height: "850px" }}
    >
      <div
        className="container flex items-center flex-col text-center p-4 text-4xl shadow h-[700px] overflow-y-auto overflow-x-hidden"
        style={{ fontFamily: "G_BEJOD_4", backgroundColor: "#ede5d4" }}
      >
        {lines.map((line, index) => {
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
                      class="fa-solid fa-hand-point-right"
                      style={{ color: "#3170dd" }}
                    ></i>{" "}
                  </div>
                ) : (
                  <div className="w-[160px] inline opacity-0">
                    <i
                      class="fa-solid fa-hand-point-right"
                      style={{ color: "#3170dd" }}
                    ></i>{" "}
                  </div>
                )}
                <p className="cursor-grab m-1 text-3xl text-center" style={{ display: "inline-block", fontFamily: "G_BEJOD_4", width: "600px" }} key={index + 1} onClick={() => { props.showInPlate(line); }}>
                  <Markdown components={{ p: ({ node, ...props }) => (<p style={{ display: "inline", cursor: "pointer" }}  {...props} />) }}>
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