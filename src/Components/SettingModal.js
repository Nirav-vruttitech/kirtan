import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SketchExample1 from './SketchExample1';
import SketchExample2 from './SketchExample2';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { setFontSize, setViewPortFontWeight, setViewPortHeight } from './../Slice/plateSlice';

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

const SettingModal = () => {
    const dispatch = useDispatch();
    const fontSize = useSelector((state) => state.viewPort.fontSize);
    const viewPortFontWeight = useSelector((state) => state.viewPort.viewPortFontWeight);
    const viewPortHeight = useSelector((state) => state.viewPort.viewPortHeight);

    const [open, setOpen] = React.useState(false);
    const [portHeight, setPortHeight] = React.useState(viewPortHeight);
    const [size, setSize] = React.useState(fontSize);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleChange = (event) => {
        // dispatch(setFontSize(event.target.value));
        setSize(event.target.value);
        dispatch(setFontSize(`${event.target.value}px`));
    };

    const handleChange1 = (event) => {
        // dispatch(setViewPortHeight(event.target.value));
        setPortHeight(event.target.value);
        dispatch(setViewPortHeight(`${event.target.value}px`));
    };

    const handleAlignment = (event, newAlignment) => {
        dispatch(setViewPortFontWeight(newAlignment));
    };

    React.useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    React.useEffect(() => {
        localStorage.setItem('viewPortFontWeight', viewPortFontWeight);
    }, [viewPortFontWeight]);

    React.useEffect(() => {
        localStorage.setItem('viewPortHeight', viewPortHeight);
    }, [viewPortHeight]);
    console.log();

    return (
        <>
            <i className="fa-solid fa-gear fa-lg mx-3" onClick={handleOpen}></i>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                                        // defaultValue={parseInt(fontSize.slice(0, 2))}
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
                                <SketchExample1 />
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
                                <SketchExample2 />
                            </div>
                            {/* <div className='px-3 pt-3 pb-2'>
                                <Select
                                    value={viewPortHeight}
                                    onChange={handleChange1}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    style={{ height: '30px', width: '150px' }}>
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="108px">108px</MenuItem>
                                    <MenuItem value="106px">106px</MenuItem>
                                    <MenuItem value="104px">104px</MenuItem>
                                    <MenuItem value="102px">102px</MenuItem>
                                    <MenuItem value="100px">100px</MenuItem>
                                    <MenuItem value="98px">98px</MenuItem>
                                    <MenuItem value="96px">96px</MenuItem>
                                    <MenuItem value="94px">94px</MenuItem>
                                    <MenuItem value="92px">92px</MenuItem>
                                    <MenuItem value="90px">90px</MenuItem>
                                    <MenuItem value="88px">88px</MenuItem>
                                    <MenuItem value="86px">86px</MenuItem>
                                    <MenuItem value="84px">84px</MenuItem>
                                    <MenuItem value="82px">82px</MenuItem>
                                    <MenuItem value="80px">80px</MenuItem>
                                    <MenuItem value="78px">78px</MenuItem>
                                    <MenuItem value="76px">76px</MenuItem>
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
                            </div> */}
                            <div className='px-3 pt-3 pb-2'>
                                <Box sx={{ width: 200 }}>
                                    <Slider
                                        aria-label="Temperature"
                                        // defaultValue={parseInt(viewPortHeight.slice(0, 2))}
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

export default SettingModal;