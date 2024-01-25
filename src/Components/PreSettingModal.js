import {
  Box,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import { useSelector } from "react-redux";
import FontList from "../Utils/FontsList.json";
import SwitchComp from "./Switch";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
};
const PreSettingModal = ({ open, handlePreSettingModal }) => {
  const preSettings = useSelector((state) => state.settings.preSettings);
  const selectedId = useSelector((state) => state.settings.selectedId);
  const [initialSettings, setInitialSettings] = useState({});

  const handleDualModeToggle = (x) => {
    // setIsDualMode(x);
    // let obj = { ...kirtanData };
    // if (kirtanData.settings) obj.settings.isDualLineMode = x;
    // updateSettings(obj);
    // dispatch(setIsDualLineMode(x));
  };

  const handleFontSliderChange = (event) => {
    setInitialSettings({
      ...initialSettings,
      fontSize: `${event.target.value}px`,
    });
  };

  const handleFontColorChange = (color) => {
    setInitialSettings({
      ...initialSettings,
      color,
    });
  };

  const handleFontWeightToggle = (event, value) => {
    setInitialSettings({
      ...initialSettings,
      fontWeight: value,
    });
  };

  const handleViewPortBgColorChange = (color) => {
    setInitialSettings({
      ...initialSettings,
      backgroundColor: color,
    });
  };

  const handleViewPortHeightSliderChange = (event) => {
    setInitialSettings({
      ...initialSettings,
      height: `${event.target.value}px`,
    });
  };
  return (
    <>
      {preSettings?.map((setting) => (
        <div key={setting.id}>
          {setting.id === selectedId && (
            <Modal open={open} onClose={() => handlePreSettingModal(false)}>
              <Box sx={style} className="rounded-2xl overflow-y-auto max-h-screen min-h-[600px]">
                <Box className="flex items-center justify-between w-full bg-blue-500 px-4 py-3 rounded-t-xl">
                  <p className="text-white font-medium text-xl">Setting</p>
                  <IconButton className="text-white" onClick={() => handlePreSettingModal(false)}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </IconButton>
                </Box>

                <Box className="flex w-full flex-col items-center justify-center px-10 py-4 gap-3">
                  <Box className="flex justify-start items-center w-full gap-6">
                    <Typography
                      className="font-semibold w-1/3"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      Font Size
                    </Typography>
                    <Typography
                      className="font-semibold"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      :
                    </Typography>
                    <Box sx={{ width: 200 }}>
                      <Slider
                        aria-label="Temperature"
                        valueLabelDisplay="auto"
                        step={2}
                        value={setting.fontSize.slice(0, -2) || 30}
                        onChange={handleFontSliderChange}
                        marks
                        min={30}
                        max={130}
                      />
                    </Box>
                  </Box>
                  <Box className="flex justify-start items-center w-full gap-6">
                    <Typography
                      className="font-semibold w-1/3"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      Font Color
                    </Typography>
                    <Typography
                      className="font-semibold"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      :
                    </Typography>
                    <ColorPicker
                      // color={Object.keys(initialSettings).length > 0 && initialSettings.color}
                      handelColor={handleFontColorChange}
                      color={setting.color}
                    />
                  </Box>
                  <Box className="flex justify-start items-center w-full gap-6">
                    <Typography
                      className="font-semibold w-1/3"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      Font Weight
                    </Typography>
                    <Typography
                      className="font-semibold "
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      :
                    </Typography>
                    <div className="">
                      <ToggleButtonGroup
                        value={setting.fontWeight}
                        exclusive
                        sx={{
                          height: "35px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        onChange={handleFontWeightToggle}
                        aria-label="viewPortFontWeight"
                      >
                        <ToggleButton value="500" sx={{ textTransform: "none", fontWeight: 500 }}>
                          Thin
                        </ToggleButton>
                        <ToggleButton
                          value="900"
                          aria-label="right aligned"
                          sx={{ textTransform: "none" }}
                        >
                          Thick
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </Box>
                  <Box className="flex justify-start items-center w-full gap-6">
                    <Typography
                      className="font-semibold w-1/3"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      View Port Color
                    </Typography>
                    <Typography
                      className="font-semibold"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      :
                    </Typography>
                    <ColorPicker
                      color={setting.backgroundColor}
                      //   handelColor={handleViewPortBgColorChange}

                      handelColor={handleViewPortBgColorChange}
                    />
                  </Box>
                  <Box className="flex justify-start items-center w-full gap-6">
                    <Typography
                      className="font-semibold w-1/3"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      View Port Size
                    </Typography>
                    <Typography
                      className="font-semibold"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      :
                    </Typography>
                    <Box sx={{ width: 200 }}>
                      <Slider
                        aria-label="Temperature"
                        valueLabelDisplay="auto"
                        step={2}
                        value={setting.height.slice(0, -2) || 40}
                        // onChange={handleViewPortHeightSliderChange}
                        marks
                        min={30}
                        max={240}
                      />
                    </Box>
                  </Box>
                  <Box className="flex justify-start items-center w-full gap-6">
                    <Typography
                      className="font-semibold w-1/3"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      Font Family
                    </Typography>
                    <Typography
                      className="font-semibold"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      :
                    </Typography>

                    <Select
                      value={setting.fontFamily}
                      //       onChange={handleSelectFontFamilyChange}
                      className="text-[15px] font-[600]"
                      size="small"
                      sx={{ ":focus": { outline: "none" }, outline: "none" }}
                    >
                      {FontList.map((font) => (
                        <MenuItem key={font.value} value={font.value}>
                          {font.text}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box className="flex justify-start items-center w-full gap-6">
                    <Typography
                      className="font-semibold w-1/3"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      Font Shadow Color
                    </Typography>
                    <Typography
                      className="font-semibold"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      :
                    </Typography>
                    <ColorPicker
                      color={setting.textShadowColor}
                      // handelColor={handleTextShadowColorChange}
                    />
                  </Box>
                  <Box className="flex justify-start items-center w-full gap-6">
                    <Typography
                      className="font-semibold w-1/3"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      Font Shadow Width
                    </Typography>
                    <Typography
                      className="font-semibold"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      :
                    </Typography>
                    <Box sx={{ width: 200 }}>
                      <Slider
                        aria-label="Temperature"
                        valueLabelDisplay="auto"
                        step={0.1}
                        value={setting.textShadowWidth.slice(0, -2) || 0}
                        //         onChange={handleTextShadowWidthChange}
                        marks
                        min={0}
                        max={5}
                      />
                    </Box>
                  </Box>
                  <Box className="flex justify-start items-center w-full gap-6">
                    <Typography
                      className="font-semibold w-1/3"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      Dual Line Mode
                    </Typography>
                    <Typography
                      className="font-semibold"
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      :
                    </Typography>
                    <SwitchComp
                      checked={setting.isDualLineMode}
                      handleChange={handleDualModeToggle}
                    />
                  </Box>
                </Box>
              </Box>
            </Modal>
          )}
        </div>
      ))}
    </>
  );
};

export default PreSettingModal;
