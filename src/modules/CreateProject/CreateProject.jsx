import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { ProjectCategory } from '../../store/projectReducer/projectReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './createProject.scss'
const CreateProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { list: aliass } = useSelector((state) => state.projectReducer);
    useEffect(() => {
        dispatch(ProjectCategory())
    }, [])
    return (
        <div className='create-project' >
            <div className='create-form'>
                <h1 className='text-center text-[30px] font-bold'>Create Project</h1>
                <form>
                    <p className='text-title'>Name</p>
                    <input className='create-input' placeholder='Name' />
                    <p className='text-title'>Description</p>
                    <Editor
                        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                        initialValue=''
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <select className='create-select'>
                        <option value=''>Chọn dự án</option>
                        {aliass?.map((alia) => {
                            return (
                                <option key={alia.id} value={alia.id}>
                                    {alia.projectCategoryName}
                                </option>
                            )
                        })}
                    </select>
                    <br />
                    <button className='create-btn'>Create Project</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProject