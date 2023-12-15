import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFontSize, setViewPortFontWeight, setViewPortHeight, setFontColorValue, setViewPortBgColor } from './../Slice/plateSlice';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import ColorPicker from './ColorPicker';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const SettingModal = ({ open, handleModalToggle }) => {
    const dispatch = useDispatch();
    const fontSize = useSelector((state) => state.viewPort.fontSize);
    const viewPortFontWeight = useSelector((state) => state.viewPort.viewPortFontWeight);
    const viewPortHeight = useSelector((state) => state.viewPort.viewPortHeight);
    const fontColorValue = useSelector(state => state.viewPort.fontColorValue);
    const ViewPortBgColor = useSelector(state => state.viewPort.ViewPortBgColor);

    const [portHeight, setPortHeight] = useState(viewPortHeight);
    const [size, setSize] = useState(fontSize);

    const handleFontColorChange = (color) => {
        localStorage.setItem('fontColorValue', (color));
        dispatch(setFontColorValue(color));
    };

    const handleViewPortBgColorChange = (color) => {
        localStorage.setItem('ViewPortBgColor', (color));
        dispatch(setViewPortBgColor(color));
    };

    const handleChange = (event) => {
        setSize(event.target.value);
        dispatch(setFontSize(`${event.target.value}px`));
    };

    const handleChange1 = (event) => {
        setPortHeight(event.target.value);
        dispatch(setViewPortHeight(`${event.target.value}px`));
    };

    const handleAlignment = (event, newAlignment) => {
        dispatch(setViewPortFontWeight(newAlignment));
    };

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem('viewPortFontWeight', viewPortFontWeight);
    }, [viewPortFontWeight]);

    useEffect(() => {
        localStorage.setItem('viewPortHeight', viewPortHeight);
    }, [viewPortHeight]);

    return (
        <Modal
            open={open}
            onClose={() => handleModalToggle(false)}
        >
            <Box sx={style}>
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <div className='px-3'>
                        <div className='py-3 font-semibold' >Font Size</div>
                        <div className='py-3 font-semibold' >Font Color</div>
                        <div className='py-3 font-semibold' >Font Bold</div>
                        <div className='py-3 font-semibold' >View Port Color</div>
                        <div className='py-3 font-semibold' >View Port Size</div>
                    </div>
                    <div className='pr-2'>
                        <div className='py-3'>:</div>
                        <div className='py-3'>:</div>
                        <div className='py-3'>:</div>
                        <div className='py-3'>:</div>
                        <div className='py-3'>:</div>
                    </div>
                    <div>
                        <div className='px-3 pt-3'>
                            <Box sx={{ width: 200 }}>
                                <Slider
                                    aria-label="Temperature"
                                    valueLabelDisplay="auto"
                                    step={2}
                                    value={size}
                                    onChange={handleChange}
                                    marks
                                    min={30}
                                    max={130}
                                />
                            </Box>
                        </div>
                        <div className='px-3 pt-3 pb-0.5'>
                            <ColorPicker color={fontColorValue} handelColor={handleFontColorChange} />
                        </div>
                        <div className='px-3 pt-3 pb-2'>
                            <ToggleButtonGroup
                                value={viewPortFontWeight}
                                exclusive
                                sx={{ height: '30px' }}
                                onChange={handleAlignment}
                                aria-label="viewPortFontWeight">
                                <ToggleButton value="" aria-label="left aligned" sx={{ textTransform: 'none', fontWeight: 500 }}>
                                    Thin
                                </ToggleButton>
                                <ToggleButton value="900" aria-label="right aligned" sx={{ textTransform: 'none' }}>
                                    Thick
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className='px-3 pt-3'>
                            <ColorPicker color={ViewPortBgColor} handelColor={handleViewPortBgColorChange} />
                        </div>
                        <div className='px-3 pt-3 pb-2'>
                            <Box sx={{ width: 200 }}>
                                <Slider
                                    aria-label="Temperature"
                                    valueLabelDisplay="auto"
                                    step={2}
                                    value={portHeight}
                                    onChange={handleChange1}
                                    marks
                                    min={40}
                                    max={140}
                                />
                            </Box>
                        </div>
                    </div>
                </Grid >
            </Box>
        </Modal>
    );
};

export default SettingModal;