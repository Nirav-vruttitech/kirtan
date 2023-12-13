import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Markdown from "react-markdown";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import keycode from 'keycode';
const Page = (props) => {

    // array of lines that store in this
    const [lines, setLines] = useState([]);

    // kirtan throw exception 
    const [originalKirtan, setOriginalKirtan] = useState(JSON.parse(localStorage.getItem('originalKirtan')) ? JSON.parse(localStorage.getItem('originalKirtan')) : '');

    const [showingLineState, setShowingLineState] = useState(lines.indexOf(props.toShowOnDisplay));
    const [shortCuts, longCuts] = useState(localStorage.getItem('shortCutsObject') ? JSON.parse(localStorage.getItem('shortCutsObject')) : {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
        11: null,
        12: null,
        13: null,
        14: null,
        15: null,
        16: null,
        17: null,
        18: null,
        19: null,
        20: null,
    });

    //handle events of key pressing
    useEffect(() => {
        const handleKeyPress = (event) => {
            event.preventDefault();
            let indexOFLine = (lines.indexOf(props.toShowOnDisplay));

            if (event.key === "Backspace" || event.key === "Delete") {
                props.showInPlate(null);
            }

            //Ctr + Key press event handler
            if (event.altKey && (event.key)) {
                for (const key in shortCuts) {
                    if (shortCuts[key] === `Alt+${event.key}`) {
                        props.showInPlate(lines[key]);
                    }
                }
            }

            if (event.ctrlKey && (event.key)) {
                for (const key in shortCuts) {
                    if (shortCuts[key] === `Control+${event.key}`) {
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

            if (event.key) {
                for (const key in shortCuts) {
                    if (shortCuts[key] === `${event.key}`) {
                        props.showInPlate(lines[key]);
                    }
                }
            }

            //Arrow key press event handler
            switch (event.key) {
                case 'ArrowLeft':
                    if (indexOFLine === 0) {
                        break;
                    }
                    else {
                        props.showInPlate(lines[indexOFLine - 1]);
                    }
                    break;
                case 'ArrowRight':
                    if (indexOFLine === lines.length - 1) {
                        break;
                    }
                    else {
                        props.showInPlate(lines[indexOFLine + 1]);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [props]);

    //split the kirtan into lines
    useEffect(() => {
        const splitLines = originalKirtan.split('\n').filter(line => line.trim() !== '');
        setLines(splitLines);
    }, [originalKirtan]);
    //that will show the first line of kirtan in plate but not works
    useEffect(() => {
        props.showInPlate(lines[0]);
    }, [lines]);

    useEffect(() => {
        setShowingLineState(lines.indexOf(props.toShowOnDisplay));
    });


    return (
        <>
            <div className="p-3 place-self-center bg-gray-100" style={{ height: '850px' }}>
                <div className='container flex justify-center items-center flex-col text-center p-4 text-4xl shadow overflow-y-scroll h-[700px]' style={{ fontFamily: 'G_BEJOD_4', backgroundColor: "#ede5d4" }}>
                    {lines.map((line, index) => {
                        return <>
                            {/* <Box sx={{ flexGrow: 1 }}>
                                <Toolbar>
                                    <div className='w-[40px]'>
                                        {showingLineState === index ? <i class="fa-solid fa-hand-point-right" style={{ color: "#3170dd" }}></i> : null}
                                    </div>
                                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, width: '800px', display: { xs: 'none', sm: 'block' } }}>
                                        <p className="cursor-grab m-1 text-3xl text-center w-[600px]" style={{ display: "inline", fontFamily: 'G_BEJOD_4' }} key={index + 1} onClick={() => { props.showInPlate(line); }} >
                                            <Markdown components={{
                                                p: ({ node, ...props }) => <p style={{ display: "inline", cursor: 'pointer' }} {...props} />,
                                            }}>{line}
                                            </Markdown>
                                        </p>
                                    </Typography>
                                    <IconButton size="medium" edge="start" color="inherit" aria-label="open drawer">
                                        {(shortCuts[index] === null || shortCuts[index] === undefined) ? <div className='w-40'></div> : <div className='w-40'><Button className="cursor-pointer m-1" style={{ display: "inline", fontFamily: 'ROBOTO', textTransform: 'none' }} variant="contained">{shortCuts[index] ? shortCuts[index] : ''}</Button></div>}
                                    </IconButton>
                                </Toolbar>
                            </Box> */}
                            <Stack className='m-auto py-[1px] w-full flex justify-center items-center'
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                            >
                                <Typography variant="h5" noWrap component="div" className='justify-center items-center' sx={{ flexGrow: 1, width: '100%', display: { xs: 'none', sm: 'flex' } }}>

                                    {showingLineState === index ? <div className='w-[160px] inline opacity-100'><i class="fa-solid fa-hand-point-right" style={{ color: "#3170dd" }}></i> </div> : <div className='w-[160px] inline opacity-0'><i class="fa-solid fa-hand-point-right" style={{ color: "#3170dd" }}></i> </div>}

                                    <p className="cursor-grab m-1 text-3xl text-center" style={{ display: "inline-block", fontFamily: 'G_BEJOD_4', width: '500px' }} key={index + 1} onClick={() => { props.showInPlate(line); }} >
                                        <Markdown components={{
                                            p: ({ node, ...props }) => <p className='w-[600px]' style={{ display: "inline", cursor: 'pointer' }} {...props} />,
                                        }}>{line}
                                        </Markdown>
                                    </p>

                                    {(shortCuts[index] === null || shortCuts[index] === undefined) ? <div className='w-40 h-[42px] inline' ></div> : <div className='w-40 h-[42px] inline'><Button className="cursor-pointer h-[25px] text-center pt-0" style={{ display: "inline", fontFamily: 'ROBOTO', textTransform: 'none' }} variant="contained">{shortCuts[index] ? shortCuts[index] : ''}</Button></div>}

                                </Typography>
                            </Stack>
                        </>;
                    })}
                </div>
            </div >
        </>
    );
};

export default Page;