import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  setFontSize,
  setViewPortFontWeight,
  setViewPortHeight,
  setFontColorValue,
  setViewPortBgColor,
} from "./../Slice/plateSlice";
import SettingModal from "./SettingModal";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

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
    // vertical padding + font size from searchIcon
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
  const [open, setOpen] = useState(false);

  const fontSize = useSelector((state) => state.viewPort.fontSize);
  const viewPortFontWeight = useSelector(
    (state) => state.viewPort.viewPortFontWeight
  );
  const viewPortHeight = useSelector((state) => state.viewPort.viewPortHeight);
  const fontColorValue = useSelector((state) => state.viewPort.fontColorValue);
  const ViewPortBgColor = useSelector(
    (state) => state.viewPort.ViewPortBgColor
  );

  const handleModalToggle = (value) => setOpen(value);

  const handleAddEditButtonNavigate = (value) => {
    navigate(value);
  };

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

  const handleSetFontWeight = (value) => {
    localStorage.setItem("viewPortFontWeight", viewPortFontWeight);
    dispatch(setViewPortFontWeight(value));
  };

  const handleSetFontSize = (value) => {
    localStorage.setItem("fontSize", fontSize);
    dispatch(setFontSize(`${value}px`));
  };

  const handleSetFontColor = (value) => {
    localStorage.setItem("fontColorValue", value);
    dispatch(setFontColorValue(value));
  };

  const handelViewPortBgColor = (value) => {
    localStorage.setItem("ViewPortBgColor", value);
    dispatch(setViewPortBgColor(value));
  };

  const handleSetViewPortHeight = (value) => {
    localStorage.setItem("viewPortHeight", viewPortHeight);
    dispatch(setViewPortHeight(`${value}px`));
  };

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
          <SettingModal
            open={open}
            handleModalToggle={handleModalToggle}
            fontSize={fontSize}
            viewPortFontWeight={viewPortFontWeight}
            viewPortHeight={viewPortHeight}
            fontColorValue={fontColorValue}
            ViewPortBgColor={ViewPortBgColor}
            handleSetFontSize={handleSetFontSize}
            handleSetFontColor={handleSetFontColor}
            handleSetFontWeight={handleSetFontWeight}
            handelViewPortBgColor={handelViewPortBgColor}
            handleSetViewPortHeight={handleSetViewPortHeight}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
