import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ color, handelColor }) => {
  const [fontColorState, setFontColorState] = useState({
    displayColorPicker: false,
    color: color,
  });

  const styles = {
    color: {
      width: "100px",
      height: "16px",
      backgroundColor: fontColorState.color,
    },
    swatch: {
      padding: "5px",
      background: "#fff",
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.9)",
      display: "inline-block",
      cursor: "pointer",
    },
    popover: {
      position: "absolute",
      zIndex: "2",
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  };

  const handleClick = () => {
    setFontColorState({
      displayColorPicker: !fontColorState.displayColorPicker,
      color: fontColorState.color,
    });
  };

  const handleClose = () => {
    setFontColorState({
      displayColorPicker: false,
      color: fontColorState.color,
    });
  };

  const handleChange = (color) => {
    setFontColorState({
      displayColorPicker: true,
      color: color.hex,
    });
    handelColor(color.hex);
  };

  return (
    <>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {fontColorState.displayColorPicker && (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={fontColorState.color} onChange={handleChange} />
        </div>
      )}
    </>
  );
};

export default ColorPicker;
