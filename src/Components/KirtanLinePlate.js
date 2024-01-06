import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import IndexedDBService from "../Utils/DBConfig";

const KirtanLinePlate = ({
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

  const [kirtanData, setKirtanData] = useState({});

  const currIndex = useSelector((state) => state.kirtanIndex.currIndex);

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const getCurrLine = () => {
    const currLine = kirtanData[kirtanId]?.content[currIndex];
    return currLine ? currLine : "";
  };

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
          <Markdown className={`h-[${height}]`}>{getCurrLine()}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default KirtanLinePlate;
