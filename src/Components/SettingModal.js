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
import { useSelector, useDispatch } from "react-redux";
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

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SettingModal = ({ open, handleModalToggle }) => {
  const dispatch = useDispatch();

  const [kirtanData, setKirtanData] = useState({});

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const [initialSettings, setInitialSettings] = useState({});

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

    if (kirtanData.settings) {
      obj.settings.fontSize = `${event.target.value}px`;
    }

    updateSettings(obj);
  };

  const handleViewPortHeightSliderChange = (event) => {
    dispatch(setHeight(`${event.target.value}px`));

    setInitialSettings({
      ...initialSettings,
      height: `${event.target.value}px`,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) {
      obj.settings.height = `${event.target.value}px`;
    }
    updateSettings(obj);
  };

  const handleFontColorChange = (color) => {
    dispatch(setColor(color));

    setInitialSettings({
      ...initialSettings,
      color,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) {
      obj.settings.color = color;
    }
    updateSettings(obj);
  };

  const handleViewPortBgColorChange = (color) => {
    dispatch(setBgColor(color));

    setInitialSettings({
      ...initialSettings,
      backgroundColor: color,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) {
      obj.settings.backgroundColor = color;
    }
    updateSettings(obj);
  };

  const handleFontWeightToggle = (event, value) => {
    dispatch(setFontWeight(value));

    setInitialSettings({
      ...initialSettings,
      fontWeight: value,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) {
      obj.settings.fontWeight = value;
    }
    updateSettings(obj);
  };

  const handleSelectFontFamilyChange = (event) => {
    dispatch(setFontFamily(event.target.value));

    setInitialSettings({
      ...initialSettings,
      fontFamily: event.target.value,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) {
      obj.settings.fontFamily = event.target.value;
    }

    updateSettings(obj);
  };

  const handleTextShadowColorChange = (color) => {
    dispatch(setTextShadowColor(color));

    setInitialSettings({
      ...initialSettings,
      textShadowColor: color,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) {
      obj.settings.textShadowColor = color;
    }

    updateSettings(obj);
  };

  const handleTextShadowWidthChange = (event) => {
    dispatch(setTextShadowWidth(event.target.value));

    setInitialSettings({
      ...initialSettings,
      textShadowWidth: `${event.target.value}px`,
    });

    let obj = { ...kirtanData };

    if (kirtanData.settings) {
      obj.settings.textShadowWidth = `${event.target.value}px`;
    }

    updateSettings(obj);
  };

  const updateSettings = (obj) => {
    IndexedDBService.updateItem(obj)
      .then((data) => {})
      .catch((error) => {});
  };

  return (
    <Modal open={open} onClose={() => handleModalToggle(false)}>
      <Box sx={style}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <div className="px-3">
            <div className="py-3 font-semibold">Font Size</div>
            <div className="py-3 font-semibold">Font Color</div>
            <div className="py-3 font-semibold">Font Bold</div>
            <div className="py-3 font-semibold">View Port Color</div>
            <div className="py-3 font-semibold">View Port Size</div>
            <div className="py-3 font-semibold">Font Family</div>
            <div className="py-3 font-semibold">Font Shadow Color</div>
            <div className="py-3 font-semibold">Font Shadow Width</div>
          </div>
          <div className="pr-2">
            <div className="py-3">:</div>
            <div className="py-3">:</div>
            <div className="py-3">:</div>
            <div className="py-3">:</div>
            <div className="py-3">:</div>
            <div className="py-3">:</div>
            <div className="py-3">:</div>
            <div className="py-3">:</div>
          </div>
          <div>
            <div className="px-3 pt-3">
              <Box sx={{ width: 200 }}>
                <Slider
                  aria-label="Temperature"
                  valueLabelDisplay="auto"
                  step={2}
                  value={
                    Object.keys(initialSettings).length > 0 &&
                    +initialSettings.fontSize.slice(0, -2)
                  }
                  onChange={handleFontSliderChange}
                  marks
                  min={30}
                  max={130}
                />
              </Box>
            </div>
            <div className="px-3 pt-3 pb-0.5">
              <ColorPicker
                color={
                  Object.keys(initialSettings).length > 0 &&
                  initialSettings.color
                }
                handelColor={handleFontColorChange}
              />
            </div>
            <div className="px-3 pt-3 pb-2">
              <ToggleButtonGroup
                value={
                  Object.keys(initialSettings).length > 0 &&
                  initialSettings.fontWeight
                }
                exclusive
                sx={{ height: "30px" }}
                onChange={handleFontWeightToggle}
                aria-label="viewPortFontWeight"
              >
                <ToggleButton
                  value=""
                  aria-label="left aligned"
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
            <div className="px-3 pt-3">
              <ColorPicker
                color={
                  Object.keys(initialSettings).length > 0 &&
                  initialSettings.backgroundColor
                }
                handelColor={handleViewPortBgColorChange}
              />
            </div>
            <div className="px-3 pt-3 pb-2">
              <Box sx={{ width: 200 }}>
                <Slider
                  aria-label="Temperature"
                  valueLabelDisplay="auto"
                  step={2}
                  value={
                    Object.keys(initialSettings).length > 0 &&
                    +initialSettings.height.slice(0, -2)
                  }
                  onChange={handleViewPortHeightSliderChange}
                  marks
                  min={40}
                  max={140}
                />
              </Box>
            </div>
            <div className="px-3 pt-2 pb-2">
              <Select
                value={
                  Object.keys(initialSettings).length > 0 &&
                  initialSettings.fontFamily
                }
                onChange={handleSelectFontFamilyChange}
                className="w-[200px] h-10 text-[15px] font-[600]"
                sx={{ ":focus": { outline: "none" }, outline: "none" }}
              >
                <MenuItem value="G_BEJOD_4">G_BEJOD_4</MenuItem>
                <MenuItem value="Guj_Bejod">Guj_Bejod</MenuItem>
                <MenuItem value="Guj_Boldy">Guj_Boldy</MenuItem>
                <MenuItem value="Guj_Diamond">Guj_Diamond</MenuItem>
                <MenuItem value="Guj_Favorite_Bold">Guj_Favorite_Bold</MenuItem>
                <MenuItem value="Guj_Favoutite">Guj_Favoutite</MenuItem>
                <MenuItem value="Guj_Hastalikhit">Guj_Hastalikhit</MenuItem>
                <MenuItem value="Guj_Heading">Guj_Heading</MenuItem>
                <MenuItem value="Guj_HeadLine">Guj_HeadLine</MenuItem>
                <MenuItem value="Guj_Khoobsurat">Guj_Khoobsurat</MenuItem>
                <MenuItem value="Guj_Komal">Guj_Komal</MenuItem>
                <MenuItem value="Guj_Najuk">Guj_Najuk</MenuItem>
                <MenuItem value="Guj_Regular">Guj_Regular</MenuItem>
                <MenuItem value="Guj_Regular_BOLD">Guj_Regular_BOLD</MenuItem>
                <MenuItem value="Guj_Saral_Bold">Guj_Saral_Bold</MenuItem>
                <MenuItem value="Guj_Saral_Normal">Guj_Saral_Normal</MenuItem>
                <MenuItem value="Guj_Script">Guj_Script</MenuItem>
                <MenuItem value="Guj_Simple_Bold">Guj_Simple_Bold</MenuItem>
                <MenuItem value="Guj_Simple_Normal">Guj_Simple_Normal</MenuItem>
                <MenuItem value="Guj_Squarish">Guj_Squarish</MenuItem>
                <MenuItem value="Guj_Sulikhit">Guj_Sulikhit</MenuItem>
                <MenuItem value="Guj_Unique">Guj_Unique</MenuItem>
                <MenuItem value="Hin_Devnagari_Bold">
                  Hin_Devnagari_Bold
                </MenuItem>
                <MenuItem value="Hin_Devnagari_Normal">
                  Hin_Devnagari_Normal
                </MenuItem>
                <MenuItem value="Hin_Hastalikhit">Hin_Hastalikhit</MenuItem>
                <MenuItem value="Hin_Khoobsurat">Hin_Khoobsurat</MenuItem>
                <MenuItem value="Hin_Saras">Hin_Saras</MenuItem>
                <MenuItem value="Hin_Script">Hin_Script</MenuItem>
                <MenuItem value="Hin_Simple_Bold">Hin_Simple_Bold</MenuItem>
                <MenuItem value="Hin_Simple_Normal">Hin_Simple_Normal</MenuItem>
                <MenuItem value="Hin_Sundar">Hin_Sundar</MenuItem>
                <MenuItem value="Hin_Tital">Hin_Tital</MenuItem>
                <MenuItem value="Hin_Vaidik">Hin_Vaidik</MenuItem>
                <MenuItem value="Hin_Vankachuka">Hin_Vankachuka</MenuItem>
              </Select>
            </div>
            <div className="px-3 pt-3 pb-0.5">
              <ColorPicker
                color={
                  Object.keys(initialSettings).length > 0 &&
                  initialSettings.textShadowColor
                }
                handelColor={handleTextShadowColorChange}
              />
            </div>
            <div className="px-3 pt-3 pb-2">
              <Box sx={{ width: 200 }}>
                <Slider
                  aria-label="Temperature"
                  valueLabelDisplay="auto"
                  step={1}
                  value={
                    Object.keys(initialSettings).length > 0 &&
                    +initialSettings.textShadowWidth.slice(0, -2)
                  }
                  onChange={handleTextShadowWidthChange}
                  marks
                  min={0}
                  max={5}
                />
              </Box>
            </div>
          </div>
        </Grid>
      </Box>
    </Modal>
  );
};

export default SettingModal;
