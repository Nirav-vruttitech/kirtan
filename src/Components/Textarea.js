import React, { useEffect, useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddStepperKirtan, setAddStepperKirtanSlice } from '../Slice/addStepperSlice';
import { useLocation } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import TurndownService from 'turndown';
import Showdown from 'showdown';
import CKEditorCss from './../ckeditor.css';
import Select from '@mui/material/Select';

const Textarea = () => {
    const turndownService = new TurndownService();
    const converter = new Showdown.Converter();
    const location = useLocation();
    const dispatch = useDispatch();

    const [kirtan, setKirtan] = useState(useSelector(state => state.kirtan.kirtan));

    const addStepperKirtan = useSelector(state => state.addStepperSlice.addStepperKirtan);

    // const ckeditorData = converter.makeHtml(kirtan);
    const ckeditorData = location.pathname === '/edit' ? converter.makeHtml(kirtan) : '';

    const [selectFontFamily, setSelectFontFamily] = useState('G_BEJOD_4');

    const handleSelectFontFamilyChange = (event) => {
        setSelectFontFamily(event.target.value);
    };

    const handleEditorChange = async (event, editor) => {
        const data = editor.getData();
        const markdown = turndownService.turndown(data);
        const latestData = markdown === '' ? 'fgg' : markdown;
        dispatch(setAddStepperKirtan(latestData));
    };

    useEffect(() => {
        dispatch(setAddStepperKirtan(turndownService.turndown(ckeditorData)));
    }, []);

    useEffect(() => {
        dispatch(setAddStepperKirtanSlice((addStepperKirtan.split('\n').filter(line => line.trim() !== '')).length));
    }, [addStepperKirtan]);

    return (
        <>
            <div className='width-full relative' style={{ minHeight: "400px" }}>
                <div className='z-50 absolute right-0'>
                    <Select
                        value={selectFontFamily}
                        onChange={handleSelectFontFamilyChange}

                        sx={{ height: '40px', width: '200px', fontSize: '15px', fontWeight: '600', ":focus": { outline: 'none' }, outline: 'none' }}
                    >
                        <MenuItem value={'G_BEJOD_4'}>G_BEJOD_4</MenuItem>
                        <MenuItem value={'sulekh'}>sulekh</MenuItem>
                        <MenuItem value={'unicode'}>unicode</MenuItem>
                    </Select>
                </div>
                <div style={{ fontFamily: selectFontFamily, fontSize: '40px' }}>
                    <CKEditor
                        max-height="500px"
                        editor={ClassicEditor}
                        data={ckeditorData}
                        onInit={
                            editor => {
                                editor.editing.view.change(writer => {
                                    writer.setStyle(
                                        'max-height',
                                        '500px',  // Set the max-height you desire
                                        editor.editing.view.document.getRoot()
                                    );
                                    writer.setStyle(
                                        'overflow',
                                        'auto',  // Add scrolling
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }
                        }
                        config={{
                            toolbar: {
                                items: [
                                    'undo', 'redo',
                                    '|', 'fontColor', 'fontfamily', 'fontsize', 'fontBackgroundColor',
                                    '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                                    '|', 'blockQuote', 'codeBlock', '|',
                                ],
                                shouldNotGroupWhenFull: false
                            },
                            contentsCss: [CKEditorCss]
                        }}
                        onChange={handleEditorChange} />
                </div>
            </div>
        </>
    );
};

export default Textarea;