import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Markdown from "react-markdown";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAddStepperShortCutsObject, setAddStepperShortCutsNewObject } from './../Slice/addStepperSlice';

const AddViewPortPage = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const addStepperKirtan = useSelector(state => state.addStepperSlice.addStepperKirtan);
    useEffect(() => {
        if (location.pathname === '/edit') { dispatch(setAddStepperShortCutsNewObject(JSON.parse(localStorage.getItem('shortCutsObject')))); }
    }, []);

    const addStepperShortCutsObject = useSelector(state => state.addStepperSlice.addStepperShortCutsObject);

    const [ShortCutValue, setShortCutValue] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);
    const [shortCutArrayValueStore, setShortCutValueArrayValueStore] = useState([]);

    const handleShowButton = (index) => {
        setSelectedButton(index);
    };

    const handleShortCutInput = (event) => {
        setShortCutValue(shortCutArrayValueStore.join(' + '));
    };

    useEffect(() => {
        console.log(shortCutArrayValueStore);
    }, [shortCutArrayValueStore]);

    const handleData = (index) => {
        if (ShortCutValue === "") dispatch(setAddStepperShortCutsObject([index, null]));
        else dispatch(setAddStepperShortCutsObject([index, ShortCutValue]));
        setShortCutValue(null);
        setShortCutValueArrayValueStore([]);
    };

    const handleEditShortcutShowButton = (index) => {
        setSelectedButton(index);
    };
    // array of lines that store in this
    const [lines, setLines] = useState([]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            event.preventDefault();

            let prevShortcuts = [...shortCutArrayValueStore];
            const keyCombination = event.key;

            if (keyCombination === 'Backspace') {
                prevShortcuts.splice(prevShortcuts.length - 1, 1);
            } else if (!prevShortcuts.includes(keyCombination)) {
                prevShortcuts.push(keyCombination);
            }

            setShortCutValueArrayValueStore(prevShortcuts);
            setShortCutValue(prevShortcuts.join("+"));

            if (event.altKey && (event.key)) {
                for (const key in addStepperShortCutsObject) {
                    if (addStepperShortCutsObject[key] === `Alt+${event.key}`) {
                        props.showInPlate(lines[key]);
                    }
                }
            }

            if (event.ctrlKey && (event.key)) {
                for (const key in addStepperShortCutsObject) {
                    if (addStepperShortCutsObject[key] === `Control+${event.key}`) {
                        props.showInPlate(lines[key]);
                    }
                }
            }

            if (event.key) {
                for (const key in addStepperShortCutsObject) {
                    if (addStepperShortCutsObject[key] === `${event.key}`) {
                        props.showInPlate(lines[key]);
                    }
                }
            }

            // if (event.keyCode === 9 && (event.key)) {
            //     for (const key in shortCuts) {
            //         if (shortCuts[key] === `Tab+${event.key}`) {
            //             props.showInPlate(lines[key]);
            //         }
            //     }
            // }

            // if (event.shiftKey && (event.key)) {
            //     console.log('`Shift+${event.key}`: ', `Shift+${event.key}`);
            //     for (const key in shortCuts) {
            //         if (shortCuts[key] === `Shift+${event.key}`) {
            //             props.showInPlate(lines[key]);
            //         }
            //     }
            // }

            // Arrow key handler
            let indexOFLine = lines.indexOf(props.toShowOnDisplay);
            switch (event.key) {
                case 'ArrowLeft':
                    if (indexOFLine > 0) {
                        props.showInPlate(lines[indexOFLine - 1]);
                    }
                    break;
                case 'ArrowRight':
                    if (indexOFLine < lines.length - 1) {
                        props.showInPlate(lines[indexOFLine + 1]);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [props, shortCutArrayValueStore, lines, addStepperShortCutsObject]);

    //split the kirtan into lines
    useEffect(() => {
        addStepperKirtan ? setLines(addStepperKirtan.split('\n').filter(line => line.trim() !== '')) : setLines(['']);
    }, []);

    //that will show the first line of kirtan in plate but not works
    useEffect(() => {
        props.showInPlate(lines[0]);
    }, [lines]);

    return (
        <>
            <div className="place-self-center overflow-y-scroll bg-white" style={{ height: '650px', fontFamily: 'G_BEJOD_4' }}>
                <div className='container text-center p-4 text-4xl' style={{}}>
                    {lines.map((line, index) => {
                        return <>
                            <Box sx={{ flexGrow: 1 }}>
                                <Toolbar>
                                    <Grid container spacing={1}>
                                        <Grid item xs={8}>
                                            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                                                <div className='w-3/4'>
                                                    <p className="cursor-grab m-1 text-3xl text-center" style={{ display: "inline", fontFamily: 'G_BEJOD_4' }} key={index + 1} onClick={() => { props.showInPlate(line); }} >
                                                        <Markdown components={{
                                                            p: ({ node, ...props }) => <p style={{ display: "inline", cursor: 'pointer' }} {...props} />,
                                                        }}>{line}
                                                        </Markdown>
                                                    </p>
                                                </div>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            {(addStepperShortCutsObject[index] !== null && addStepperShortCutsObject[index] !== undefined) && !(selectedButton === index) ?
                                                <Button onClick={() => { handleEditShortcutShowButton(index); }} className="cursor-pointer m-1" style={{ display: "inline", fontFamily: 'ROBOTO', textTransform: 'none' }} variant="contained">{addStepperShortCutsObject[index]}</Button> : (selectedButton === index) ?
                                                    <div className='flex justify-center'><Input value={ShortCutValue} placeholder="Add ShortCut" onChange={handleShortCutInput} /><i onClick={() => { handleShowButton(null); handleData(index); }} className="fa-solid fa-check mx-2 text-[#3675e2]"></i></div> : <IconButton onClick={() => { handleShowButton(index); }} size="small" style={{ backgroundColor: '#1976D2', color: 'white', marginRight: '4px' }}><i className="fa-regular fa-plus"></i></IconButton>
                                            }
                                        </Grid>
                                    </Grid>
                                </Toolbar>
                            </Box>
                        </>;
                    })}
                </div>
            </div>
        </>
    );
};

export default AddViewPortPage;