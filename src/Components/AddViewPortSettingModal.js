import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddStepperFontSize, setAddStepperViewPortFontWeight, setAddStepperViewPortHeight, setAddStepperViewPortBgColor, setAddStepperFontColorValue } from './../Slice/addStepperSlice';
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

const AddViewPortSettingModal = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleModalDisplay = () => setOpen(!open);

    const addStepperFontSize = useSelector((state) => state.addStepperSlice.addStepperFontSize);
    const addStepperViewPortFontWeight = useSelector((state) => state.addStepperSlice.addStepperViewPortFontWeight);
    const addStepperViewPortHeight = useSelector((state) => state.addStepperSlice.addStepperViewPortHeight);
    const addStepperFontColorValue = useSelector(state => state.addStepperSlice.addStepperFontColorValue);
    const addStepperViewPortBgColor = useSelector(state => state.addStepperSlice.addStepperViewPortBgColor);

    const [portHeight, setPortHeight] = useState(addStepperViewPortHeight);
    const [size, setSize] = useState(addStepperFontSize);


    const handleFontColorChange = (color) => {
        dispatch(setAddStepperFontColorValue(color));
    };

    const handleViewPortBgColorChange = (color) => {
        dispatch(setAddStepperViewPortBgColor(color));
    };
    const handleChange = (event) => {
        setSize(event.target.value);
        dispatch(setAddStepperFontSize(`${event.target.value}px`));
    };

    const handleChange1 = (event) => {
        setPortHeight(event.target.value);
        dispatch(setAddStepperViewPortHeight(`${event.target.value}px`));
    };

    const handleAlignment = (event, newAlignment) => {
        dispatch(setAddStepperViewPortFontWeight(newAlignment));
    };

    return (
        <>
            <div className='flex flex-row absolute top-2 right-4'>
                <i className="fa-solid fa-gear fa-xl" onClick={handleModalDisplay}></i>
            </div>
            <Modal
                open={open}
                onClose={handleModalDisplay}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                        <div className='px-3'>
                            <div className='py-3 font-semibold' >Font Size</div>
                            <div className='py-3 font-semibold' >Font Color</div>
                            <div className='py-3 font-semibold' >Font Bold</div>
                            <div className='py-3 font-semibold' >View Port Color</div>
                            <div className='py-3 font-semibold' >View Port Height</div>
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
                                <ColorPicker color={addStepperFontColorValue} handelColor={handleFontColorChange} />
                            </div>
                            <div className='px-3 pt-3 pb-2'>
                                <ToggleButtonGroup
                                    value={addStepperViewPortFontWeight}
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
                                <ColorPicker color={addStepperViewPortBgColor} handelColor={handleViewPortBgColorChange} />
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
        </>
    );
};

export default AddViewPortSettingModal;