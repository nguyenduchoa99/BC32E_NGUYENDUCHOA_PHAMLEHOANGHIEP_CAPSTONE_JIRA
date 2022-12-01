import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectDetail, updateProjects, ProjectCategory } from '../../../store/projectReducer/projectReducer'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './updateProject.scss'
import { Layout } from 'antd';
import { logout } from '../../../store/authReducer/authReducer';
const { Header } = Layout;
const UpdateProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const acce = user.accessToken;

    const { update: projects, list: aliass } = useSelector(
        (state) => state.project
    );

    const creatorId = projects.creator?.id;

    useEffect(() => {
        dispatch(getProjectDetail({ projectId, acce }));
        dispatch(ProjectCategory());
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
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
        setValue("description", projects?.description);
        setValue("categoryId", projects?.projectCategory?.id)
    };

    const handleChange = (evt) => {
        const type = evt.target.value;
        setValue("categoryId", type);
    };

    const onSubmit = async (values) => {
        console.log(values);
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const acce = user.accessToken;
            await dispatch(updateProjects({ values, projectId, acce })).unwrap();
            navigate("/");
            Swal.fire({
                icon: 'success',
                title: 'Update Project thành công'
            })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Update Project thất bại',
                text: err
            })
        }
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    }
    return (
        <Layout className='update-project' >
             <Header style={{ background: "white", padding: "0px",position:'absolute',top:'0',right:0}}>
                {user ? (
                    <div style={{ display: 'flex' }}>
                        <div>
                            <span className='text-span-icon'>
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <strong className='text-name-strong'>{user.name}</strong>
                        </div>
                        <div>
                            <button className='btn-logout' onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                ) : null}
            </Header>
            <div className='update-form'>
                <h1 className='text-center text-[30px] font-bold'>Update Project</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <p className='text-title'>Name</p>
                        <input
                            className='update-input'
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
                        <textarea className='update-text'
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
                        <select className='update-select'
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
                        <button className='update-btn'>Update Project</button>
                    </div>
                </form>
                {setInput()}
            </div>
        </Layout>
    )
}

export default UpdateProject