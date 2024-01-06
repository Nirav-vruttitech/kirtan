import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import IndexedDBService from "../Utils/DBConfig";
import "../CSS/MarkDown.css";

const KirtanLinePlate = ({
  backgroundColor,
  height,
  color,
  fontSize,
  fontWeight,
  fontFamily,
}) => {
  const style = {
    fontFamily,
    backgroundColor,
    height,
    color,
    fontSize,
    fontWeight,
  };

  const [kirtanData, setKirtanData] = useState({});

  const currIndex = useSelector((state) => state.kirtanIndex.currIndex);

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const [currLine, setCurrLine] = useState("");

  // function isColorLight(color) {
  //   // Assuming color is in HEX format like "#RRGGBB"
  //   const hex = color.replace("#", "");
  //   const r = parseInt(hex.substring(0, 2), 16);
  //   const g = parseInt(hex.substring(2, 4), 16);
  //   const b = parseInt(hex.substring(4, 6), 16);

  //   const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  //   return luminance > 128; // You can adjust the threshold here
  // }

  useEffect(() => {
    const currLine = kirtanData[kirtanId]?.content[currIndex];

    if (currLine) {
      setCurrLine(currLine);
    } else {
      setCurrLine("");
    }
  }, [currIndex, kirtanId, kirtanData]);

  useEffect(() => {
    isDbInitialized &&
      IndexedDBService.getAllData().then((data) => {
        setKirtanData(data);
      });
  }, [isDbInitialized]);

  return (
    <div className="fixed inset-x-0 bottom-1">
      <div className="text-center  border-black border flex items-center w-full">
        <div
          className="text-center w-full flex justify-center items-center"
          style={style}
        >
          <Markdown className={`h-[${height}]`}>{currLine}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default KirtanLinePlate;
