import * as React from 'react';
import Markdown from "react-markdown";
import { useSelector } from 'react-redux';

const AddViewPortPlate = ({ toShowOnDisplay }) => {

    const [fontFamily, setFontFamily] = React.useState('G_BEJOD_4');

    const fontSize = useSelector(state => state.addStepperSlice.addStepperFontSize);

    const fontColorValue = useSelector(state => state.addStepperSlice.addStepperFontColorValue);

    const viewPortFontWeight = useSelector(state => state.addStepperSlice.addStepperViewPortFontWeight);

    const ViewPortBgColor = useSelector(state => state.addStepperSlice.addStepperViewPortBgColor);

    const viewPortHeight = useSelector(state => state.addStepperSlice.addStepperViewPortHeight);
    return (
        <>
            <div className='fixed inset-x-0 bottom-1'>
                <div className="text-center  border-black border flex items-center w-full" style={{ fontFamily: fontFamily, backgroundColor: ViewPortBgColor, height: viewPortHeight, fontWeight: viewPortFontWeight, color: fontColorValue, fontSize: fontSize }}>
                    <p className="text-center w-full "><Markdown>{toShowOnDisplay ? toShowOnDisplay : ''}</Markdown></p>
                </div>
            </div>
        </>
    );
};

export default AddViewPortPlate;