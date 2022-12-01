import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getProjectDetails, getTaskDetail, updateTasks, getAll, getAllpri, getAlltas } from '../../../store/taskReducer/taskReducer'
import { Select } from 'antd';
import './updateTask.scss'
const { Option } = Select
const UpdateTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { taskId } = useParams();
    const [selEct, setsElect] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const acce = user.accessToken;

    const {
        data1: taskss,
        updatetask: task1,
        getall,
        getallpri,
        getalltas,
        listMemberz,
    } = useSelector((state) => state.task);

    const listUser = task1?.assigness;
    const [listMember, setList] = useState(listUser);
    const lisZz2 = listMember?.map((item) => {
        return `${item.id}`;
    });

    const taskIds = taskss.id;

    const taskIdss = JSON.parse(localStorage.getItem("projecidjira"));

    useEffect(() => {
        dispatch(getProjectDetails({ taskId: taskIdss, acce }));
        dispatch(getTaskDetail({ taskId, acce }));
        dispatch(getAll());
        dispatch(getAllpri(taskId));
        dispatch(getAlltas());
    }, []);

    useEffect(() => {
        setList(listUser);
    }, [listUser]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            listUserAsign: [],
            taskId: +taskId,
            taskName: "",
            description: "",
            statusId: "",
            originalEstimate: "",
            timeTrackingSpent: "",
            timeTrackingRemaining: "",
            projectId: taskIds,
            typeId: "",
            priorityId: "",
        },
        mode: "onTouched",
    });
    const deleteMember = (e, item) => {
        e.preventDefault();
        const filMember = listMember.filter((itemz) => {
            return itemz.id !== item;
        });
        setList(filMember);
    };

    const setInput = () => {
        setValue("taskName", task1?.taskName);
        setValue("originalEstimate", task1?.originalEstimate);
        setValue("timeTrackingSpent", task1?.timeTrackingSpent);
        setValue("timeTrackingRemaining", task1?.timeTrackingRemaining);
        setValue("description", task1?.description);
        setValue("priorityId", task1?.priorityTask?.priorityId);
        setValue("typeId", task1?.typeId);
        setValue("statusId", task1?.statusId);
        setValue("listUserAsign", lisZz2);
    };
    const handleListUserAsign = e => {
        setValue("listUserAsign", lisZz2.concat(e));
    };
    const handleStatusId = e => {
        const type = e.target.value;
        setValue("statusId", type);
    };

    const handlePriorityId = e => {
        const type = e.target.value;
        setValue("priorityId", type);
    };

    const handleTypeId = e => {
        const type = e.target.value;
        setValue("typeId", type);
    };

    const onSubmit = async (values) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const acces = user.accessToken;
        try {
            await dispatch(updateTasks({ values, acces })).unwrap();
            navigate(`/task/${taskIds}`);
            Swal.fire({
                icon: 'success',
                title: 'Update task thành công'
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update task thất bại',
                text: error.content
            })
        }
    };
    return (
        <div className='update-task'>
            <div className='update-task-form'>
                <h1 className="text-center text-[30px] font-bold">Update Task</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <p className='text-title'>Task Name</p>
                        <input
                            className='input-task-update'
                            type="text"
                            style={{ width: "100%", padding: "3px 10px" }}
                            value={task1?.taskName}
                        />
                    </div>

                    <div className='flex justify-between'>
                        <div >
                            <p className='text-title'>Status</p>
                            <select
                                className="select-task-update"
                                style={{ display: "block", padding: "3px 10px" }}
                                onChange={handleStatusId}
                                {...register("statusId")}
                            >
                                <option>Chọn Status</option>
                                {getall?.map((get) => {
                                    return (
                                        <option key={get.statusId} value={get.statusId}>
                                            {get.statusName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div >
                            <p className='text-title'>Priority</p>
                            <select
                                className="select-task-update"
                                style={{ display: "block", padding: "3px 10px" }}
                                onChange={handlePriorityId}
                                {...register("priorityId")}
                            >
                                <option>Chọn Priority</option>
                                {getallpri?.map((getpri) => {
                                    return (
                                        <option key={getpri.priorityId} value={getpri.priorityId}>
                                            {getpri.priority}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div >
                            <p className='text-title'>Task Type</p>
                            <select
                                className="select-task-update"
                                style={{ display: "block", padding: "3px 10px" }}
                                onChange={handleTypeId}
                                {...register("typeId")}
                            >
                                <option>Chọn TypeId</option>
                                {getalltas?.map((gettas) => {
                                    return (
                                        <option key={gettas.id} value={gettas.id}>
                                            {gettas.taskType}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <div >
                        <p className='text-title pb-2'>Assignees</p>
                        <div >
                            {listMember?.map((item) => {
                                return (
                                    <div key={item.id} >
                                        <div
                                            className='border-b-2 flex justify-between'
                                            style={{ width: '30%' }}
                                        >
                                            <span className='font-thin pb-2'> {item.name}</span>
                                            <button
                                                className='border-2 border-red-500 pl-1 pr-1 ml-2'
                                                onClick={(evt) => deleteMember(evt, item.id)}
                                            >
                                                <i className="fa-solid fa-trash text-red-500"></i>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            className=' bg-green-500 p-2 text-white rounded-md mt-3 mb-2 hover:bg-green-700'
                            onClick={(evt) => {
                                evt.preventDefault();
                                setsElect(!selEct);
                            }}
                        >
                            Add More +
                        </button>
                        {selEct ? (
                            <Select
                                className='input-task-update-ch'
                                mode="tags"
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="Add more +"
                                onChange={handleListUserAsign}
                            >
                                {taskss?.members
                                    ?.filter((mem) => {
                                        let index = listMember?.findIndex(
                                            (us) => us.id === mem.userId
                                        );
                                        if (index !== -1) {
                                            return false;
                                        }
                                        return true;
                                    })
                                    .map((mem) => {
                                        return (
                                            <Option value={mem.userId} key={mem.userId}>
                                                {mem.name}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        ) : (
                            " "
                        )}
                    </div>

                    <div >
                        <div className='flex justify-between pt-4'>
                            <div >
                                <p className='text-title'>Original Estimete</p>
                                <input
                                    className='input-task-update'

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
                                    <p style={{ color: "red" }}>
                                        {errors.originalEstimate.message}
                                    </p>
                                )}
                            </div>
                            <div >
                                <p className='text-title'>Time Spent</p>
                                <input
                                    className='input-task-update'
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
                                    <p style={{ color: "red" }}>
                                        {errors.timeTrackingSpent.message}
                                    </p>
                                )}
                            </div>
                            <div >
                                <p className='text-title'>Time remaining</p>
                                <input
                                    className='input-task-update'
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
                                    <p style={{ color: "red" }}>
                                        {errors.timeTrackingRemaining.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div >
                        <p className='text-title'>Description</p>
                        <textarea
                            className="task-text-update"
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
                            <p style={{ color: "red" }}>{errors.description.message}</p>
                        )}
                    </div>
                    <button className="btn-update-task">Update Task</button>
                </form>
                {setInput()}
            </div>
        </div>
    )
}

export default UpdateTask