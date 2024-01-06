import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Markdown from "react-markdown";

const KirtanLinePlate = ({
  toShowOnDisplay,
  backgroundColor,
  height,
  color,
  fontSize,
  fontWeight,
  fontFamily,
}) => {
  const style = {
    fontFamily: fontFamily,
    backgroundColor: backgroundColor,
    height: height,
    color: color,
    fontSize: fontSize,
    fontWeight: fontWeight,
  };

  const [currLine, setCurrLine] = useState("");

  const kirtan = useSelector((state) => state.kirtan.kirtan);

  const currIndex = useSelector((state) => state.kirtanIndex.currIndex);

  useEffect(() => {
    const kirtanArray = kirtan.split("\n").filter((line) => line.trim() !== "");
    setCurrLine(kirtanArray[currIndex]);
  }, [currIndex, kirtan]);

  // useEffect(() => {
  //   const kirtanArray = kirtan[currIndex].line;
  //   setCurrLine(kirtan[currIndex].line);
  // }, [currIndex, kirtan]);

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
