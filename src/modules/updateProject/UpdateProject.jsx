import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectDetail, updateProject, ProjectCategory } from '../../store/projectReducer/projectReducer';


const UpdateProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const { dataProjectDetail: projects, list: aliass } = useSelector((state) => state.projectReducer);
    console.log(projects);
    const creatorId = projects.creator?.id;
    useEffect(() => {
        dispatch(getProjectDetail({ projectId }));
        dispatch(ProjectCategory());
    }, []);
    const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        defaultValues: {
            id: projects.id,
            projectName: "",
            creator: creatorId,
            description: "",
            categoryId: "",
        },
        mode: "onTouched",
    });
    const setInput = () => {
        setValue("projectName", projects?.projectName);
        setValue('description', projects?.description);
        setValue('categoryId', projects?.projectCategory?.id);
    };
    const handleChange = (e) => {
        const type = e.target.value;
        setValue("categoryId", type);
    };
    const onSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await dispatch(updateProject({ values, projectId })).unwrap();
            navigate('/');
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật project thành công'
            });
        }
        catch (err) {
            Swal.fire({
                icon: 'error',
                title: "Cập nhật project thất bại",
                text: err
            });
        }
    };
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
                        {errors.categoryId?.type === "validate" && (
                            <p className='text-red-500'>Vui lòng chọn lại</p>
                        )}
                    </div>
                    <div>
                        <button className='create-btn'>Update Project</button>
                    </div>
                </form>
                {setInput()}
            </div>
        </div>
    )
}

export default UpdateProject