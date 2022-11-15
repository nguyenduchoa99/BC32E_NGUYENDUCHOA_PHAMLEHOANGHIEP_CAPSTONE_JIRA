import React, { useEffect } from 'react'
import { ProjectCategory, createProjectAuthorize } from '../../store/projectReducer/projectReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './createProject.scss'
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
const CreateProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { list: aliass } = useSelector((state) => state.projectReducer);
    useEffect(() => {
        dispatch(ProjectCategory())
    }, []);
    const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        defaultValues: {
            projectName: "",
            description: "",
            categoryId: "",
            alias: "",
        },
        mode: 'onTouched',
    });
    const handleChange = (e) => {
        const type = e.target.value;
        setValue('categoryId', type);
    };
    const onSubmit = async (values) => {
        try {
            await dispatch(createProjectAuthorize(values)).unwrap();
            navigate('/');
            await Swal.fire({
                icon: 'success',
                title: 'Tạo Project thành công',
            })
        }
        catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Tạo Project thất bại',
                text: err.message
            });
        }
    }
    return (
        <div className='create-project' >
            <div className='create-form'>
                <h1 className='text-center text-[30px] font-bold'>Create Project</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <p className='text-title'>Name</p>
                        <input
                            className='create-input'
                            placeholder='Name'
                            {...register('projectName', {
                                required: {
                                    value: true,
                                    message: 'Name không được để trống',
                                },
                                minLength: {
                                    value: 6,
                                    message: "Name từ 6 đến 25 kí tự",
                                },
                                maxLength: {
                                    value: 25,
                                    message: 'Name từ 6 đến 25 ký tự',
                                }
                            })} />
                        {errors.projectName && <p className='text-red-500'>{errors.projectName.message}</p>}
                    </div>
                    <div>
                        <p className='text-title'>Description</p>
                        <textarea className='create-text'
                            cols={63}
                            rows={8}
                            {...register('description', {
                                required: {
                                    value: true,
                                    message: 'Description không được bỏ trống'
                                }
                            })}
                        />
                        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    </div>
                    <div>
                        <select className='create-select'
                            onChange={handleChange}
                            {...register("categoryId", { validate: value => value !== "" })}>
                            <option value=''>Chọn dự án</option>
                            {aliass?.map((alia) => {
                                return (
                                    <option key={alia.id} value={alia.id}>
                                        {alia.projectCategoryName}
                                    </option>
                                )
                            })}
                        </select>
                        {errors.categoryId?.type === "validate" &&(
                            <p className='text-red-500'>Vui lòng chọn lại</p>
                        )}
                    </div>
                    <div>
                        <button className='create-btn'>Create Project</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProject