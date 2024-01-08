import { Button } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React, { useState } from "react";
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

  const [open, setOpen] = useState(false);

  const handleModalToggle = (value) => setOpen(value);

  const handleAddEditButtonNavigate = (value) => navigate(value);

  const kirtanId = useSelector((state) => state.kirtanIndex.kirtanId);

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
          <SettingModal open={open} handleModalToggle={handleModalToggle} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
