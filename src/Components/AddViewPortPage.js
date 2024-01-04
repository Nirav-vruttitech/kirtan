import React, { useEffect, useState } from 'react';
import Markdown from "react-markdown";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAddStepperShortCutsObject, setAddStepperShortCutsNewObject } from './../Slice/addStepperSlice';

const AddViewPortPage = ({ toShowOnDisplay, showInPlate }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const addStepperKirtan = useSelector(state => state.addStepperSlice.addStepperKirtan);

    useEffect(() => {
        if (location.pathname === '/edit') { dispatch(setAddStepperShortCutsNewObject(JSON.parse(localStorage.getItem('shortCutsObject'))) || {}); }
    }, []);

    const addStepperShortCutsObject = useSelector(state => state.addStepperSlice.addStepperShortCutsObject) || { 1: null };
    const fontFamily = useSelector(state => state.kirtan.fontFamily);

    const [shortCutValue, setShortCutValue] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);
    const [shortCutArrayValueStore, setShortCutValueArrayValueStore] = useState([]);

    const handleShowButton = (index) => setSelectedButton(index);

    const handleShortCutInput = (event) => setShortCutValue(shortCutArrayValueStore.join(' + '));

    const handleData = (index) => {
        const shortCutStringValue = shortCutValue === "" ? null : shortCutValue;
        dispatch(setAddStepperShortCutsObject([index, shortCutStringValue]));
        setShortCutValue(null);
        setShortCutValueArrayValueStore([]);
    };

    const handleEditShortcutShowButton = (index) => setSelectedButton(index);

    const [lines, setLines] = useState([]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            event.preventDefault();

            let prevShortcuts = [...shortCutArrayValueStore];
            const keyCombination = event.key;
            const pushValue = keyCombination === 'Control' ? 'Ctr' : keyCombination;

            if (pushValue === 'Backspace') {
                prevShortcuts.splice(prevShortcuts.length - 1, 1);
            } else if (!prevShortcuts.includes(pushValue)) {
                if (!(pushValue === 'Shift' || pushValue === 'CapsLock' || pushValue === 'ArrowDown' || pushValue === 'ArrowRight' || pushValue === 'ArrowUp' || pushValue === 'ArrowLeft' || pushValue === 'Tab' || pushValue === 'Meta')) { prevShortcuts.push(pushValue); };
            }

            setShortCutValueArrayValueStore(prevShortcuts);
            setShortCutValue(prevShortcuts.join("+"));

            if (event.altKey && (event.key)) {
                for (const key in addStepperShortCutsObject) {
                    if (addStepperShortCutsObject[key] === `Alt+${event.key}`) {
                        showInPlate(lines[key]);
                    }
                }
            }

            if (event.ctrlKey && (event.key)) {
                for (const key in addStepperShortCutsObject) {
                    if (addStepperShortCutsObject[key] === `Ctr+${event.key}`) {
                        showInPlate(lines[key]);
                    }
                }
            }

            if (event.key) {
                for (const key in addStepperShortCutsObject) {
                    if (addStepperShortCutsObject[key] === `${event.key}`) {
                        showInPlate(lines[key]);
                    }
                }
            }

            // Arrow key handler
            let indexOFLine = lines.indexOf(toShowOnDisplay);
            switch (event.key) {
                case 'ArrowLeft':
                    if (indexOFLine > 0) {
                        showInPlate(lines[indexOFLine - 1]);
                    }
                    break;
                case 'ArrowRight':
                    if (indexOFLine < lines.length - 1) {
                        showInPlate(lines[indexOFLine + 1]);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [toShowOnDisplay, shortCutArrayValueStore, lines, addStepperShortCutsObject]);

    //split the kirtan into lines
    useEffect(() => { addStepperKirtan ? setLines(addStepperKirtan.split('\n').filter(line => line.trim() !== '')) : setLines(['']); }, []);

    //that will show the first line of kirtan in plate but not works
    useEffect(() => { showInPlate(lines[0]); }, [lines]);

    return (
        <>
            <div class="place-self-center overflow-y-scroll border-collapse h-[600px] stepper-page" style={{ fontFamily: fontFamily }}>
                <div className='container text-center p-4 text-4xl' style={{}}>
                    {lines.map((line, index) => {
                        return <Box sx={{ flexGrow: 1 }}>
                            <Toolbar>
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <div className="flex-grow">
                                            <div className='w-3/4'>
                                                <p className="cursor-grab m-1 text-3xl text-center" style={{ display: "inline", fontFamily: fontFamily }} key={index + 1} onClick={() => { showInPlate(line); }} >
                                                    <Markdown components={{
                                                        p: ({ node, ...props }) => <p style={{ display: "inline", cursor: 'pointer' }} {...props} />,
                                                    }}>{line}
                                                    </Markdown>
                                                </p>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {(addStepperShortCutsObject[index] !== null && addStepperShortCutsObject[index] !== undefined) && !(selectedButton === index) ?
                                            <Button className="cursor-pointer m-1 " style={{ display: "inline", fontFamily: 'ROBOTO', textTransform: 'none' }} variant="contained" onClick={() => { handleEditShortcutShowButton(index); }}>{addStepperShortCutsObject[index]}</Button> : (selectedButton === index) ?
                                                <div className='flex justify-center'><Input value={shortCutValue} placeholder="Add ShortCut" onChange={handleShortCutInput} /><i onClick={() => { handleShowButton(null); handleData(index); }} className="fa-solid fa-check mx-2 text-[#3675e2]"></i></div> : <IconButton onClick={() => { handleShowButton(index); }} size="small" style={{ backgroundColor: '#1976D2', color: 'white', marginRight: '4px' }}><i className="fa-regular fa-plus"></i></IconButton>
                                        }
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </Box>;
                    })}
                </div>
            </div>
        </>
    );
};

export default AddViewPortPage;