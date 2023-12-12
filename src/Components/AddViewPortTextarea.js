import React, { useEffect } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddStepperKirtan, setAddStepperShortCutsObject, setAddStepperKirtanSlice } from './../Slice/addStepperSlice';
import TurndownService from 'turndown';
import Showdown from 'showdown';
import { Link } from "react-router-dom";
import CKEditorCss from './../ckeditor.css';
import { useLocation } from 'react-router-dom';

const AddViewPortTextarea = (props) => {
    const turndownService = new TurndownService();
    const converter = new Showdown.Converter();
    const location = useLocation();
    const dispatch = useDispatch();

    const addStepperKirtan = useSelector(state => state.addStepperSlice.addStepperKirtan);
    const addStepperShortCutsObject = useSelector(state => state.addStepperSlice.addStepperShortCutsObject);

    const [ckeditorData, setCkeditorData] = React.useState(location.pathname === '/edit' ? converter.makeHtml(JSON.parse(localStorage.getItem('originalKirtan'))) : '');

    useEffect(() => {
        dispatch(setAddStepperKirtan(turndownService.turndown(ckeditorData)));
    }, []);

    const handleEditorChange = async (event, editor) => {
        const data = editor.getData();
        const markdown = turndownService.turndown(data);
        markdown === '' ? dispatch(setAddStepperKirtan(null)) : dispatch(setAddStepperKirtan(markdown));
    };

    React.useEffect(() => {
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
                                console.log('Editor is ready to use!', editor);
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
                            toolbar: ['bold', 'italic', 'undo', 'redo', 'fontColor', 'fontBackgroundColor'],
                            contentsCss: [CKEditorCss]
                        }}
                        onChange={handleEditorChange} />
                </div>
            </div >
        </>
    );
};

export default AddViewPortTextarea;