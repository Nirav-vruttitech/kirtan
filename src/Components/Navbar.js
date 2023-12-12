import React, { useState, useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import SettingModal from './SettingModal';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu display
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Kirtan
                    </Typography>
                    <Search className="mx-2">
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                    <Button className="mx-2" size="sm" style={{ backgroundColor: 'white' }}><Link to="/input"><i className="fa-solid fa-plus fa-xl mx-2"></i><strong>Add New</strong></Link></Button>
                    <Button className="mx-2" size="sm" style={{ backgroundColor: 'white' }}><Link to="/edit"><i class="fa-solid fa-pen-nib fa-xl mx-2"></i><strong>Edit</strong></Link></Button>
                    <IconButton size="medium" edge="start" color="inherit" aria-label="open drawer">
                        <SettingModal />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box >
    );
};

export default Navbar;