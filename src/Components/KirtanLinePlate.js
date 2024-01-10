import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import IndexedDBService from "../Utils/DBConfig";

const KirtanLinePlate = () => {
  const [styles, setStyles] = useState({});

  const [currLine, setCurrLine] = useState("");

  const [kirtanData, setKirtanData] = useState({});

  const color = useSelector((state) => state.settings.color);

  const height = useSelector((state) => state.settings.height);

  const fontSize = useSelector((state) => state.settings.fontSize);

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const fontFamily = useSelector((state) => state.settings.fontFamily);

  const fontWeight = useSelector((state) => state.settings.fontWeight);

  const currIndex = useSelector((state) => state.kirtanIndex.currIndex);

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const backgroundColor = useSelector(
    (state) => state.settings.backgroundColor
  );

  const textShadowColor = useSelector(
    (state) => state.settings.textShadowColor
  );

  const textShadowWidth = useSelector(
    (state) => state.settings.textShadowWidth
  );

  useEffect(() => {
    setStyles({
      backgroundColor,
      color,
      fontFamily,
      fontSize,
      fontWeight,
      height,
      WebkitTextStroke: `${textShadowWidth} ${textShadowColor}`,
    });
  }, [
    backgroundColor,
    color,
    fontFamily,
    fontSize,
    fontWeight,
    height,
    textShadowWidth,
    textShadowColor,
  ]);

  useEffect(() => {
    const currLine =
      kirtanData.length > 0 &&
      kirtanData.find((kirtan) => kirtan.id === Number(kirtanId))?.content[
        currIndex
      ];

    if (currLine) setCurrLine(currLine);
    else setCurrLine("");
  }, [currIndex, kirtanId, kirtanData]);

  useEffect(() => {
    isDbInitialized &&
      IndexedDBService.getAllData().then((data) => setKirtanData(data));
  }, [isDbInitialized]);

  return (
    <div className="fixed inset-x-0 bottom-0">
      <div className="text-center  border-black border flex items-center w-full">
        <div
          className="text-center w-full flex justify-center items-center"
          style={{
            ...styles,
          }}
        >
          <Markdown className={`h-[${styles.height}]`}>{currLine}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default KirtanLinePlate;
