import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, getAllpri, getAlltas, getProjectDetails, createTask } from '../../../store/taskReducer/taskReducer'
import { Select, Layout } from 'antd';
import Swal from 'sweetalert2';
import './createTask.scss'
const { Option } = Select;
const { Header } = Layout;
const CreateTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const acce = user.accessToken;
    const { taskId } = useParams();

    const {
        data1: tasks,
        getall,
        getallpri,
        getalltas,
    } = useSelector((state) => state.task);

    useEffect(() => {
        dispatch(getProjectDetails({ taskId, acce }));
        dispatch(getAll());
        dispatch(getAllpri(taskId));
        dispatch(getAlltas());
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: "",
            originalEstimate: "",
            timeTrackingSpent: "",
            timeTrackingRemaining: "",
            projectId: taskId,
            typeId: "",
            priorityId: "",
        },
        mode: "onTouched",
    });

    const handleStatusId = e => {
        const type = e.target.value;
        setValue("statusId", type);
    };

    const handlePri = e => {
        const type = e.target.value;
        setValue("priorityId", type);
    };

    const handleType = e => {
        const type = e.target.value;
        setValue("typeId", type);
    };

    const handleListUser = e => {
        setValue("listUserAsign", e);
    };

    const onSubmit = async (values) => {
        console.log(values);
        const user = JSON.parse(localStorage.getItem("user"));
        const acces = user.accessToken;
        try {
            await dispatch(createTask({ values, acces })).unwrap();
            navigate(`/task/${taskId}`);
            Swal.fire({
                icon: 'success',
                title: 'Tạo task thành công'
            })
            document.body.style.backgroundColor = null;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Tạo task thất bại',
                text: error.content
            })
        }
    };
    return (
        <Layout className='create-task'>
            <div className='create-task-form'>
                <h1 className='text-center text-[30px] font-bold'>Create Task</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <p className='text-title'>Task Name</p>
                        <input
                            className='input-task'
                            {...register('taskName', {
                                required: {
                                    value: true,
                                    message: "Task Name không được để trống",
                                },
                            })}
                        />
                        {errors.taskName && <p className='text-red-500'>{errors.taskName.message}</p>}
                    </div>
                    <div className='flex justify-between'>
                        <div >
                            <p className='text-title'>Status</p>
                            <select
                                className="select-task"
                                onChange={handleStatusId}
                                {...register("statusId", {
                                    validate: (value) => value !== "",
                                })}
                            >
                                <option value="">Chọn Status</option>
                                {getall?.map((get) => {
                                    return (
                                        <option key={get.statusId} value={get.statusId}>
                                            {get.statusName}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.statusId?.type === "validate" && (
                                <p className='text-red-500'>Vui lòng chọn lại</p>
                            )}
                        </div>
                        <div>
                            <p className='text-title'>Priority</p>
                            <select
                                className="select-task"
                                onChange={handlePri}
                                {...register("priorityId", {
                                    validate: (value) => value !== "",
                                })}
                            >
                                <option value="">Chọn Priority</option>
                                {getallpri?.map((getpri) => {
                                    return (
                                        <option key={getpri.priorityId} value={getpri.priorityId}>
                                            {getpri.priority}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.priorityId?.type === "validate" && (
                                <p className='text-red-500'>Vui lòng chọn lại</p>
                            )}
                        </div>
                        <div>
                            <p className='text-title'>Task Type</p>
                            <select
                                className="select-task"
                                onChange={handleType}
                                {...register("typeId", {
                                    validate: (value) => value !== "",
                                })}
                            >
                                <option value="">Chọn TypeId</option>
                                {getalltas?.map((gettas) => {
                                    return (
                                        <option key={gettas.id} value={gettas.id}>
                                            {gettas.taskType}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.typeId?.type === "validate" && (
                                <p className='text-red-500'>Vui lòng chọn lại</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className='text-title'>Assignees</p>
                        <Select
                            className='input-task-ch'
                            mode="tags"
                            style={{
                                width: "100%",
                            }}
                            placeholder="add user"
                            onChange={handleListUser}
                        >
                            {tasks?.members?.map((task) => {
                                return <Option key={task.userId}>{task.name}</Option>;
                            })}
                        </Select>
                    </div>
                    <div className='flex justify-between pt-4'>
                        <div >
                            <p className='text-title'>Original Estimete</p>
                            <input
                                className='input-task'
                                style={{ display: "block" }}
                                type="text"
                                {...register("originalEstimate", {
                                    required: {
                                        value: true,
                                        message: "Original Estimete không được để trống",
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Original Estimete không đúng định dạng"
                                    }
                                })}
                            />
                            {errors.originalEstimate && (
                                <p className='text-red-500'>
                                    {errors.originalEstimate.message}
                                </p>
                            )}
                        </div>
                        <div >
                            <p className='text-title'>Time Spent</p>
                            <input
                                className='input-task'
                                style={{ display: "block" }}
                                type="text"
                                {...register("timeTrackingSpent", {
                                    required: {
                                        value: true,
                                        message: "Time Spent không được để trống",
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Time Spent không đúng định dạng"
                                    }
                                })}
                            />
                            {errors.timeTrackingSpent && (
                                <p className='text-red-500'>
                                    {errors.timeTrackingSpent.message}
                                </p>
                            )}
                        </div>
                        <div >
                            <p className='text-title'>Time remaining</p>
                            <input
                                className='input-task'
                                style={{ display: "block" }}
                                type="text"
                                {...register("timeTrackingRemaining", {
                                    required: {
                                        value: true,
                                        message: "Time remaining không được để trống",
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Time remaining không đúng định dạng"
                                    }
                                })}
                            />
                            {errors.timeTrackingRemaining && (
                                <p className='text-red-500'>
                                    {errors.timeTrackingRemaining.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className='text-title'>Description</p>
                        <textarea
                            className="task-text"
                            rows={5}
                            cols={50}
                            style={{ width: "100%", padding: "3px 10px" }}
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Description không được để trống",
                                },
                            })}
                        />
                        {errors.description && (
                            <p className='text-red-500'>{errors.description.message}</p>
                        )}
                    </div>
                    <div>
                        <button className='btn-create-task'>Tạo Task</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default CreateTask