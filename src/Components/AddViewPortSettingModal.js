import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddViewPortSketchExample1 from './AddViewPortSketchExample1';
import AddViewPortSketchExample2 from './AddViewPortSketchExample2';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { setAddStepperFontSize, setAddStepperViewPortFontWeight, setAddStepperViewPortHeight } from './../Slice/addStepperSlice';

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addStepperFontSize = useSelector((state) => state.addStepperSlice.addStepperFontSize);
    const addStepperViewPortFontWeight = useSelector((state) => state.addStepperSlice.addStepperViewPortFontWeight);
    const addStepperViewPortHeight = useSelector((state) => state.addStepperSlice.addStepperViewPortHeight);

    const handleChange = (event) => {
        dispatch(setAddStepperFontSize(event.target.value));
    };

    const handleChange1 = (event) => {
        dispatch(setAddStepperViewPortHeight(event.target.value));
    };

    const handleAlignment = (event, newAlignment) => {
        dispatch(setAddStepperViewPortFontWeight(newAlignment));
    };

    return (
        <>
            <div className='flex flex-row absolute top-2 right-4'>
                <i className="fa-solid fa-gear fa-xl" onClick={handleOpen}></i>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
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
                            <div className='px-3 pt-3 pb-2'>
                                <Select
                                    value={addStepperFontSize}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    style={{ height: '30px', width: '150px' }}>
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="54px">54px</MenuItem>
                                    <MenuItem value="52px">52px</MenuItem>
                                    <MenuItem value="50px">50px</MenuItem>
                                    <MenuItem value="48px">48px</MenuItem>
                                    <MenuItem value="46px">46px</MenuItem>
                                    <MenuItem value="44px">44px</MenuItem>
                                    <MenuItem value="42px">42px</MenuItem>
                                    <MenuItem value="40px">40px</MenuItem>
                                    <MenuItem value="38px">38px</MenuItem>
                                    <MenuItem value="36px">36px</MenuItem>
                                </Select>
                            </div>
                            <div className='px-3 pt-3 pb-0.5'>
                                <AddViewPortSketchExample1 />
                            </div>
                            <div className='px-3 pt-3 pb-2'>
                                <ToggleButtonGroup
                                    value={addStepperViewPortFontWeight}
                                    exclusive
                                    sx={{ height: '30px' }}
                                    onChange={handleAlignment}
                                    aria-label="viewPortFontWeight">

                                    <ToggleButton value="100" aria-label="left aligned" sx={{ textTransform: 'none', fontWeight: 500 }}>
                                        Thin
                                    </ToggleButton>
                                    <ToggleButton value="600" aria-label="centered" sx={{ textTransform: 'none' }}>
                                        Normal
                                    </ToggleButton>
                                    <ToggleButton value="900" aria-label="right aligned" sx={{ textTransform: 'none' }}>
                                        Thick
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            <div className='px-3 pt-3'>
                                <AddViewPortSketchExample2 />
                            </div>
                            <div className='px-3 pt-3 pb-2'>
                                <Select
                                    value={addStepperViewPortHeight}
                                    onChange={handleChange1}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    style={{ height: '30px', width: '150px' }}>
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="74px">74px</MenuItem>
                                    <MenuItem value="72px">72px</MenuItem>
                                    <MenuItem value="70px">70px</MenuItem>
                                    <MenuItem value="68px">68px</MenuItem>
                                    <MenuItem value="66px">66px</MenuItem>
                                    <MenuItem value="64px">64px</MenuItem>
                                    <MenuItem value="62px">62px</MenuItem>
                                    <MenuItem value="60px">60px</MenuItem>
                                    <MenuItem value="58px">58px</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </Grid >
                </Box>
            </Modal>
        </>
    );
};

export default AddViewPortSettingModal;