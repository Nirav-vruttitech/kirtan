import React from "react";
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

  return (
    <div className="fixed inset-x-0 bottom-1">
      <div className="text-center  border-black border flex items-center w-full">
        <div
          className="text-center w-full flex justify-center items-center"
          style={style}
        >
          <Markdown className={`h-[${height}]`}>
            {toShowOnDisplay ? toShowOnDisplay : ""}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

export default KirtanLinePlate;
