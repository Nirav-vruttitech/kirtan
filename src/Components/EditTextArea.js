import React, { useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddStepperKirtan, setAddStepperShortCutsObject, setAddStepperKirtanSlice } from '../Slice/addStepperSlice';
import TurndownService from 'turndown';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const AddViewPortTextarea = () => {
    const turndownService = new TurndownService();

    const dispatch = useDispatch();
    const [data, setData] = useState(JSON.parse(localStorage.getItem('originalKirtan')));
    const handleEditorChange = async (event, editor) => {
        const data = editor.getData();
        setData(data);
        const markdown = turndownService.turndown(data);
        // dispatch(setAddStepperKirtan(markdown));
    };

    return (
        <>
            <div className='w-full h-screen m-auto' style={{ backgroundColor: "#ede5d4" }}>
                <div className="container mx-50">
                    <div className="pt-10 overflow-auto " style={{ fontFamily: 'G_BEJOD_4', fontSize: '40px' }}>
                        <CKEditor className="overflow-auto"
                            editor={ClassicEditor}
                            data={data}
                            onInit={
                                editor => {
                                    console.log('Editor is ready to use!', editor);
                                }
                            }
                            config={{
                                toolbar: ['bold', 'italic', 'undo', 'redo', 'fontColor', 'fontBackgroundColor']
                            }}
                            onChange={handleEditorChange} />
                    </div>
                    <div className='container'>
                        <div className='inline'>
                            <button className="mt-3 border-double rounded-full text-white w-40 text-center" style={{ height: '30px', backgroundColor: '#b45515' }}><Link to="/"><div className=''><i className="fa-solid fa-backward fa-xl mr-2"></i>Back To Home</div></Link></button>
                        </div>
                        <div className='inline text-center'>
                            <button className="m-3 border-double rounded-full w-24" style={{ height: '30px', backgroundColor: '#66A43C', color: 'white' }}><Link to="/"><i className="fa-solid fa-check fa-lg mr-2"></i>Save</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddViewPortTextarea;
