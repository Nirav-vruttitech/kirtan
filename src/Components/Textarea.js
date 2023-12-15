import React, { useEffect } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddStepperKirtan, setAddStepperKirtanSlice } from '../Slice/addStepperSlice';
import TurndownService from 'turndown';
import Showdown from 'showdown';
import CKEditorCss from './../ckeditor.css';
import { useLocation } from 'react-router-dom';

const Textarea = () => {
    const turndownService = new TurndownService();
    const converter = new Showdown.Converter();
    const location = useLocation();
    const dispatch = useDispatch();

    const addStepperKirtan = useSelector(state => state.addStepperSlice.addStepperKirtan);

    const ckeditorData = location.pathname === '/edit' ? converter.makeHtml(JSON.parse(localStorage.getItem('originalKirtan'))) : '';

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
            <div className='width-full' style={{ minHeight: "400px" }}>
                <div style={{ fontFamily: 'G_BEJOD_4', fontSize: '40px' }}>
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
                                    '|', 'blockQuote', 'codeBlock', '|'
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