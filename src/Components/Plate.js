import React, { useEffect } from 'react';
import Markdown from "react-markdown";
import { useSelector } from 'react-redux';

const Plate = ({ toShowOnDisplay }) => {

    const [fontFamily, setFontFamily] = React.useState('G_BEJOD_4');

    React.useEffect(() => {
        if (!toShowOnDisplay) setFontFamily('ROBOTO');
        else setFontFamily('G_BEJOD_4');
    }, [toShowOnDisplay]);

    const fontSize = useSelector(state => state.viewPort.fontSize);

    const fontColorValue = useSelector(state => state.viewPort.fontColorValue);

    const viewPortFontWeight = useSelector(state => state.viewPort.viewPortFontWeight);

    const ViewPortBgColor = useSelector(state => state.viewPort.ViewPortBgColor);

    const viewPortHeight = useSelector(state => state.viewPort.viewPortHeight);

    return (
        <>
            <div className='fixed inset-x-0 bottom-1'>
                <div className="text-center  border-black border flex items-center w-full" style={{ fontFamily: fontFamily, backgroundColor: ViewPortBgColor, height: viewPortHeight, color: fontColorValue, fontSize: fontSize, fontWeight: viewPortFontWeight }}>
                    <p className="text-center w-full "><Markdown>{toShowOnDisplay ? toShowOnDisplay : ''}</Markdown></p>
                </div>
            </div>
        </>
    );
};

export default Plate;