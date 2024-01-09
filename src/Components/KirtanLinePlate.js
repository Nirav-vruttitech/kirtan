import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import IndexedDBService from "../Utils/DBConfig";
import "../CSS/MarkDown.css";

const KirtanLinePlate = () => {
  const [kirtanData, setKirtanData] = useState({});

  const currIndex = useSelector((state) => state.kirtanIndex.currIndex);

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const [currLine, setCurrLine] = useState("");

  const [styles, setStyles] = useState({});

  const backgroundColor = useSelector(
    (state) => state.settings.backgroundColor
  );

  const color = useSelector((state) => state.settings.color);

  const fontFamily = useSelector((state) => state.settings.fontFamily);

  const fontSize = useSelector((state) => state.settings.fontSize);

  const fontWeight = useSelector((state) => state.settings.fontWeight);

  const height = useSelector((state) => state.settings.height);

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
      textShadow: `-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
      2px 2px 0 #000, -1px -2px 0 #000, 1px -2px 0 #000, -2px -1px 0 #000,
      2px -1px 0 #000, -2px 1px 0 #000, 2px 1px 0 #000, -1px 2px 0 #000,
      1px 2px 0 #000;`,
    });
  }, [backgroundColor, color, fontFamily, fontSize, fontWeight, height]);

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
          style={{
            ...styles,
            textShadow: `-${textShadowWidth}px -${textShadowWidth}px 0 ${textShadowColor}, ${textShadowWidth}px -${textShadowWidth}px 0 ${textShadowColor}, -${textShadowWidth}px ${textShadowWidth}px 0 ${textShadowColor},
          ${textShadowWidth}px ${textShadowWidth}px 0 ${textShadowColor}, -1px -${textShadowWidth}px 0 ${textShadowColor}, 1px -${textShadowWidth}px 0 ${textShadowColor}, -${textShadowWidth}px -1px 0 ${textShadowColor},
          ${textShadowWidth}px -1px 0 ${textShadowColor}, -${textShadowWidth}px 1px 0 ${textShadowColor}, ${textShadowWidth}px 1px 0 ${textShadowColor}, -1px ${textShadowWidth}px 0 ${textShadowColor},
          1px ${textShadowWidth}px 0 ${textShadowColor}`,
          }}
        >
          <Markdown className={`h-[${styles.height}]`}>{currLine}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default KirtanLinePlate;
