import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import AddViewPortSettingModal from './AddViewPortSettingModal';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Textarea from './Textarea';
import Plate from './Plate';
import AddViewPortPage from './AddViewPortPage';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setAddStepperKirtanSlice } from './../Slice/addStepperSlice';
import { setFontSize, setFontColorValue, setViewPortFontWeight, setViewPortBgColor, setViewPortHeight } from './../Slice/plateSlice';

const steps = ['Enter New Kirtan', 'Check the Tab ViewPort'];

const AddStepper = () => {
    const fontSize = useSelector(state => state.addStepperSlice.addStepperFontSize);
    const fontColorValue = useSelector(state => state.addStepperSlice.addStepperFontColorValue);
    const viewPortFontWeight = useSelector(state => state.addStepperSlice.addStepperViewPortFontWeight);
    const ViewPortBgColor = useSelector(state => state.addStepperSlice.addStepperViewPortBgColor);
    const viewPortHeight = useSelector(state => state.addStepperSlice.addStepperViewPortHeight);

    const addStepperKirtan = useSelector(state => state.addStepperSlice.addStepperKirtan);
    const addStepperShortCutsObject = useSelector(state => state.addStepperSlice.addStepperShortCutsObject);

    const dispatch = useDispatch();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const showInPlate = (line) => {
        setToShowOnDisplay(line);
    };

    const [toShowOnDisplay, setToShowOnDisplay] = React.useState('');

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmitClick = () => {
        localStorage.setItem('fontSize', fontSize);
        localStorage.setItem('viewPortFontWeight', viewPortFontWeight);
        localStorage.setItem('viewPortHeight', viewPortHeight);
        localStorage.setItem('fontColorValue', fontColorValue);
        localStorage.setItem('ViewPortBgColor', ViewPortBgColor);
        localStorage.setItem('originalKirtan', JSON.stringify(addStepperKirtan));
        localStorage.setItem('shortCutsObject', JSON.stringify(addStepperShortCutsObject));

        dispatch(setFontSize(fontSize));
        dispatch(setFontColorValue(fontColorValue));
        dispatch(setViewPortFontWeight(viewPortFontWeight));
        dispatch(setViewPortBgColor(ViewPortBgColor));
        dispatch(setViewPortHeight(viewPortHeight));
    };

    return (
        <div className="w-full h-screen pt-3 bg-gray-100">
            <div className='container pt-3'>
                <Box sx={{ width: '100%' }}>
                    <div className='pb-3 flex justify-center w-full relative'>
                        <Stepper activeStep={activeStep} sx={{ width: '600px' }}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps} sx={{}}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                            {activeStep !== 0 && <AddViewPortSettingModal />}
                        </Stepper>
                    </div>
                    {activeStep === 0 ? (
                        <React.Fragment>
                            <div className='mt-2 mb-1'>
                                <Textarea />
                            </div>
                            <Box className="item-center" sx={{ display: 'flex', flexDirection: 'row', pt: 2, alignItems: 'center', justifyContent: 'center' }}>
                                <Link to="/"><Button variant="text" sx={{ mr: 2, backgroundColor: 'black', color: 'white', ":hover": { backgroundColor: 'gray' } }}>
                                    Back
                                </Button></Link>
                                <Button variant="text" onClick={handleNext} sx={{ mr: 1, backgroundColor: '#0a56d0', color: 'white', ":hover": { backgroundColor: '#3171d6' } }}>
                                    Next
                                </Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment >
                            <div className='mb-20'>
                                <div className='mt-2'>
                                    <div className='w-full h-[600px] m-auto'>
                                        <AddViewPortPage showInPlate={showInPlate} toShowOnDisplay={toShowOnDisplay} />
                                        <Plate toShowOnDisplay={toShowOnDisplay} backgroundColor={ViewPortBgColor} height={viewPortHeight} color={fontColorValue} fontSize={fontSize} fontWeight={viewPortFontWeight} />
                                    </div>
                                </div>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 2, mt: 0, backgroundColor: 'black', color: 'white', ":hover": { backgroundColor: 'gray', color: 'white' } }} >
                                        Back
                                    </Button>
                                    <Button onClick={handleSubmitClick} sx={{ mr: 5, backgroundColor: '#0a56d0', color: 'white', ":hover": { backgroundColor: '#3171d6', color: 'white' } }}>
                                        <Link to="/">Submit</Link>
                                    </Button>
                                </Box>
                            </div>
                        </React.Fragment>
                    )}
                </Box>
            </div>
        </div >
    );
};

export default AddStepper;