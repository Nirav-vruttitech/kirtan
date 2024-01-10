import { Button } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SettingModal from "./SettingModal";
import SwitchComp from "./Switch";
import { setSettingsOpen } from "../Slice/settingsSlice";

import { useDispatch } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isHome = window.location.pathname.split("/")[1] === "";

  const [open, setOpen] = useState(false);

  const [isLive, setIsLive] = useState(false);

  const handleChange = async (x) => {
    const res = await handleVMixInput(x);
    res && setIsLive(x);
    localStorage.setItem("isLive", JSON.stringify(x));
  };

  const handleModalToggle = (value) => {
    dispatch(setSettingsOpen(value));
    setOpen(value);
  };

  const handleAddEditButtonNavigate = (value) => navigate(value);

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const handleVMixInput = async (flag) => {
    let vmixSettings = localStorage.getItem("vmixSettings");
    if (vmixSettings) {
      vmixSettings = JSON.parse(vmixSettings);
      let func = "OverlayInput";

      if (flag) func = func + vmixSettings.overlayChannelId + "In";
      else func = func + vmixSettings.overlayChannelId + "Out";

      let url = `${vmixSettings.webControllerUrl}/api/?Function=${func}&input=${vmixSettings.inputId}`;
      try {
        await fetch(url, { mode: "no-cors" });
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  const handleKeyPress = async (event) => {
    let flag = isLive;
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
      if (event.key === "Escape") {
        flag = false;
      } else if (event.key === "Enter") {
        flag = true;
      } else if (event.key === " ") {
        flag = !flag;
      } else {
        event.preventDefault();
      }

      const res = await handleVMixInput(flag);

      localStorage.setItem("isLive", JSON.stringify(flag));

      res && setIsLive(flag);
    }
  };

  useEffect(() => {
    isHome && window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isHome, isLive]);

  useEffect(() => {
    const isLive = localStorage.getItem("isLive");

    if (isLive !== null || isLive !== undefined) {
      setIsLive(isLive === "true");
    }
  }, []);

  return (
    <Box className="h-16 fixed inset-x-0 top-0" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Kirtan
          </Typography>
          <SwitchComp
            checked={isLive}
            handleChange={handleChange}
            label="Caption Live"
          />
          <Search className="mx-2">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button
            className="mx-2 w-[121px] bg-white"
            size="sm"
            onClick={() => {
              handleAddEditButtonNavigate("/input");
            }}
          >
            <i className="fa-solid fa-plus fa-xl mx-2"></i>
            <strong>Add New</strong>
          </Button>
          <Button
            className="mx-2 w-[100px] bg-white"
            size="sm"
            onClick={() => {
              handleAddEditButtonNavigate(`/edit/${kirtanId}`);
            }}
          >
            <i className="fa-solid fa-pen-nib fa-xl mx-2"></i>
            <strong>Edit</strong>
          </Button>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            onClick={() => {
              handleModalToggle(true);
            }}
            aria-label="open drawer"
          >
            <i className="fa-solid fa-gear fa-lg mx-3"></i>
          </IconButton>
          <SettingModal open={open} handleModalToggle={handleModalToggle} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
