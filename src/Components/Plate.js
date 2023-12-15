import React, { useEffect, useState } from 'react';
import Markdown from "react-markdown";


const Plate = ({ toShowOnDisplay, backgroundColor, height, color, fontSize, fontWeight }) => {

    const [fontFamily, setFontFamily] = useState('G_BEJOD_4');

    useEffect(() => {
        if (!toShowOnDisplay) setFontFamily('ROBOTO');
        else setFontFamily('G_BEJOD_4');
    }, [toShowOnDisplay]);

    const style = {
        fontFamily: fontFamily,
        backgroundColor: backgroundColor,
        height: height,
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight
    };

    return (
        <div className='fixed inset-x-0 bottom-1'>
            <div className="text-center  border-black border flex items-center w-full" style={style}>
                <p className="text-center w-full "><Markdown>{toShowOnDisplay ? toShowOnDisplay : ''}</Markdown></p>
            </div>
        </div>
    );
};

export default Plate;