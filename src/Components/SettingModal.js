import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import ColorPicker from "./ColorPicker";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import FontList from "../Utils/FontsList.json";
import {
  setBgColor,
  setColor,
  setFontFamily,
  setFontSize,
  setFontWeight,
  setHeight,
  setTextShadowColor,
  setTextShadowWidth,
} from "../Slice/settingsSlice";
import IndexedDBService from "../Utils/DBConfig";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

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

const SettingModal = ({ open, handleModalToggle }) => {
  const dispatch = useDispatch();

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const [kirtanData, setKirtanData] = useState({});

  const [initialSettings, setInitialSettings] = useState({});

  const [vmixSettings, setVmixSettings] = useState({
    webControllerUrl: "",
    overlayChannelId: "",
    inputId: "",
  });

  const handleVmixSettingsChange = (event) => {
    event.preventDefault();
    let settings = { ...vmixSettings };
    const value = event.target.value;
    if (value != "-1") {
      settings = {
        ...settings,
        [event.target.name]: value,
      };
      setVmixSettings(settings);
      localStorage.setItem("vmixSettings", JSON.stringify(settings));
    }
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let styles = kirtanData && kirtanData.settings;

    if (styles && Object.keys(styles).length > 0) {
      dispatch(setColor(styles.color));
      dispatch(setBgColor(styles.backgroundColor));
      dispatch(setFontWeight(styles.fontWeight));
      dispatch(setFontSize(styles.fontSize));
      dispatch(setHeight(styles.height));
      dispatch(setFontFamily(styles.fontFamily));
      dispatch(setTextShadowColor(styles.textShadowColor));
      dispatch(setTextShadowWidth(styles.textShadowWidth));

      setInitialSettings(styles);
    }
  }, [kirtanData, kirtanId]);

  useEffect(() => {
    isDbInitialized &&
      IndexedDBService.getAllData().then((data) =>
        setKirtanData(data[kirtanId])
      );
  }, [isDbInitialized, kirtanId]);

  const handleFontSliderChange = (event) => {
    setInitialSettings({
      ...initialSettings,
      fontSize: `${event.target.value}px`,
    });

    dispatch(setFontSize(`${event.target.value}px`));

    let obj = { ...kirtanData };

    if (kirtanData.settings) obj.settings.fontSize = `${event.target.value}px`;

    updateSettings(obj);
  };

  const handleViewPortHeightSliderChange = (event) => {
    dispatch(setHeight(`${event.target.value}px`));

    setInitialSettings({
      ...initialSettings,
      height: `${event.target.value}px`,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) obj.settings.height = `${event.target.value}px`;

    updateSettings(obj);
  };

  const handleFontColorChange = (color) => {
    dispatch(setColor(color));

    setInitialSettings({
      ...initialSettings,
      color,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) obj.settings.color = color;

    updateSettings(obj);
  };

  const handleViewPortBgColorChange = (color) => {
    dispatch(setBgColor(color));

    setInitialSettings({
      ...initialSettings,
      backgroundColor: color,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) obj.settings.backgroundColor = color;

    updateSettings(obj);
  };

  const handleFontWeightToggle = (event, value) => {
    dispatch(setFontWeight(value));

    setInitialSettings({
      ...initialSettings,
      fontWeight: value,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) obj.settings.fontWeight = value;

    updateSettings(obj);
  };

  const handleSelectFontFamilyChange = (event) => {
    dispatch(setFontFamily(event.target.value));

    setInitialSettings({
      ...initialSettings,
      fontFamily: event.target.value,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) obj.settings.fontFamily = event.target.value;

    updateSettings(obj);
  };

  const handleTextShadowColorChange = (color) => {
    dispatch(setTextShadowColor(color));

    setInitialSettings({
      ...initialSettings,
      textShadowColor: color,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) obj.settings.textShadowColor = color;

    updateSettings(obj);
  };

  const handleTextShadowWidthChange = (event) => {
    dispatch(setTextShadowWidth(`${event.target.value}px`));

    setInitialSettings({
      ...initialSettings,
      textShadowWidth: `${event.target.value}px`,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings)
      obj.settings.textShadowWidth = `${event.target.value}px`;

    updateSettings(obj);
  };

  useEffect(() => {
    let settings = localStorage.getItem("vmixSettings");

    if (settings) {
      settings = JSON.parse(settings);
      setVmixSettings(settings);
    }
  }, []);

  const updateSettings = (obj) => {
    isDbInitialized &&
      IndexedDBService.updateItem(obj)
        .then((data) => {})
        .catch((error) => {});
  };

  return (
    <Modal open={open} onClose={() => handleModalToggle(false)}>
      <Box
        sx={style}
        className="rounded-2xl overflow-y-auto max-h-screen min-h-[600px]"
      >
        <Box className="flex items-center justify-between w-full bg-blue-500 px-4 py-3 rounded-t-xl">
          <p className="text-white font-medium text-xl">Setting</p>
          <IconButton
            className="text-white"
            onClick={() => handleModalToggle(false)}
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </IconButton>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          className="w-full pt-2"
        >
          <Tab
            style={{
              textTransform: "none",
              fontSize: "16px",
            }}
            label="View Port Setting"
          />
          <Tab
            style={{
              textTransform: "none",
              fontSize: "16px",
            }}
            label="VMix Setting"
          />
        </Tabs>
        {value === 0 && (
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
                  value={
                    Object.keys(initialSettings).length > 0
                      ? +initialSettings.fontSize.slice(0, -2)
                      : 30
                  }
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
                color={
                  Object.keys(initialSettings).length > 0 &&
                  initialSettings.color
                }
                handelColor={handleFontColorChange}
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
                className="font-semibold"
                sx={{
                  fontSize: "17px",
                  fontWeight: "600",
                }}
              >
                :
              </Typography>
              <div className="">
                <ToggleButtonGroup
                  value={
                    Object.keys(initialSettings).length > 0 &&
                    initialSettings.fontWeight
                  }
                  exclusive
                  sx={{
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onChange={handleFontWeightToggle}
                  aria-label="viewPortFontWeight"
                >
                  <ToggleButton
                    value="500"
                    sx={{ textTransform: "none", fontWeight: 500 }}
                  >
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
                color={
                  Object.keys(initialSettings).length > 0 &&
                  initialSettings.backgroundColor
                }
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
                  value={
                    Object.keys(initialSettings).length > 0
                      ? +initialSettings.height.slice(0, -2)
                      : 40
                  }
                  onChange={handleViewPortHeightSliderChange}
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
                value={
                  Object.keys(initialSettings).length > 0 &&
                  initialSettings.fontFamily
                }
                onChange={handleSelectFontFamilyChange}
                className="text-[15px] font-[600]"
                size="small"
                sx={{ ":focus": { outline: "none" }, outline: "none" }}
              >
                {FontList.map((font) => (
                  <MenuItem value={font.value}>{font.text}</MenuItem>
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
                color={
                  Object.keys(initialSettings).length > 0 &&
                  initialSettings.textShadowColor
                }
                handelColor={handleTextShadowColorChange}
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
                  value={
                    Object.keys(initialSettings).length > 0
                      ? +initialSettings.textShadowWidth.slice(0, -2)
                      : 0
                  }
                  onChange={handleTextShadowWidthChange}
                  marks
                  min={0}
                  max={5}
                />
              </Box>
            </Box>
          </Box>
        )}
        {value === 1 && (
          <Box className="flex w-full flex-col items-center justify-center px-10 py-4 gap-3">
            <Box className="flex justify-start items-center w-full gap-6">
              <Typography
                className="font-semibold w-1/3"
                sx={{
                  fontSize: "17px",
                  fontWeight: "600",
                }}
              >
                Web Controller URL
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

              <TextField
                placeholder="http://172.18.240.1:8088"
                size="small"
                className="w-[250px]"
                value={vmixSettings.webControllerUrl}
                onChange={handleVmixSettingsChange}
                name="webControllerUrl"
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
                Overlay Channel ID
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
              <TextField
                placeholder="Channel ID"
                size="small"
                className="w-[250px]"
                value={vmixSettings.overlayChannelId}
                onChange={handleVmixSettingsChange}
                name="overlayChannelId"
                type="number"
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
                Input ID
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
              <TextField
                placeholder="Input ID"
                size="small"
                className="w-[250px]"
                value={vmixSettings.inputId}
                onChange={handleVmixSettingsChange}
                name="inputId"
                type="number"
              />
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SettingModal;
