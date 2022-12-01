import React, { useState, useEffect } from "react";
import { Layout, Modal } from "antd";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    getProjectDetails,
    getAllComment,
    insertComment,
    deleteComment,
    updateComment,
    removeTaskz
} from "../../../store/taskReducer/taskReducer";
import {
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import './listTask.scss'
import { logout } from "../../../store/authReducer/authReducer";
const { Header } = Layout;
const { confirm } = Modal;
const ListTask = () => {
    const [open, setOpen, collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Content of the modal");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    const [rederbut, setRenderbut] = useState(false);
    const { taskId } = useParams();
    localStorage.setItem("projecidjira", JSON.stringify(taskId));
    const { data1: tasks, comment } = useSelector((state) => state.task);

    useEffect(() => {
        dispatch(getProjectDetails({ taskId, acces }));
    }, []);

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            id: "",
            taskId: "",
            contentComment: "",
        },
    });

    const showModalb = (commentId) => {
        dispatch(getAllComment(commentId));
        setValue("taskId", commentId);
        setOpen(true);
    };

    const handleOkb = () => {
        setModalText("The modal will be closed after two seconds");
        setConfirmLoading(true);
        setOpen(false);
        setConfirmLoading(false);
    };

    const handleCancelb = () => {
        setRenderbut(false);
        setOpen(false);
        setValue("contentComment", " ");
        setValue("id", "");
    };

    const UpdateTask = (taskId) => {
        navigate(`/task/updatetask/${taskId}`);
    };

    const showConfirm = (taskIds, acce, taskId) => {
        confirm({
            title: "Do you Want to delete task ?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                handleDelete(taskIds, acce, taskId);
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const handleDelete = (taskIds, acce, taskId) => {
        dispatch(removeTaskz({ taskIds, acce, taskId }));
    };
    const handleDeleteComment = (commentId, acces, taskId) => {
        dispatch(deleteComment({ commentId, acces, taskId }));
    };

    const onSubmit = async (values) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const acces = user.accessToken;
        try {
            if (values.id === "") {
                dispatch(insertComment({ values, acces }));
                setValue("contentComment", " ");
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm comment thành công'
                })
            } else {
                dispatch(updateComment({ values, acces }));
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Thêm comment thất bại',
                text: error
            })
        }
    };
    const handleGetdetail = (comment) => {
        setRenderbut(true);
        setValue("contentComment", comment.contentComment);
        setValue("id", comment.id);
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    }
    return (
        <Layout className="list-task">
             <Header style={{ background: "white", padding: "0px", display: 'flex', justifyContent: "space-between" }}>
                <h1 className='text-project'>Task</h1>
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
            <div>
                <div className="task-content">
                    {tasks?.lstTask?.map((task) => {
                        return (
                            <div key={task.statusId} className='task-item'>
                                <div >
                                    <p className="task-name">{task.statusName}</p>
                                    <div className="task-project">
                                        {task.lstTaskDeTail.map((lstTask) => {
                                            return (
                                                <div style={{ borderRadius: "10px" }}>
                                                    <div key={lstTask.taskId}>
                                                        <div width={"100%"}>
                                                            <p className="task-title"> TASK NAME: <span className="task-inname">{lstTask.taskName}</span> </p>
                                                        </div>
                                                        <div width={"100%"} className="mt-3">
                                                            <p className="task-title"> DESCRIPTION: <span className="task-indes">{lstTask.description}</span>
                                                            </p>
                                                        </div>
                                                        <div className="border-2">
                                                            <p className="task-title"> {lstTask.priorityTask.priority}: </p>
                                                            <div >
                                                                {lstTask.assigness.map((assignes) => {
                                                                    return (
                                                                        <div >
                                                                            {/* <img style={{ width: '35px', borderRadius: "50PX", marginLeft: '5px' }} src={assignes.avatar} alt="" /> */}
                                                                            <p className="ml-2 mt-1 text-[18px]">{assignes.name}</p>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <div className="border-b-2 border-black	pl-4">
                                                            <button className="btn-update-task" onClick={() => UpdateTask(lstTask.taskId)}> Update </button>
                                                            <button className="btn-comment-task" onClick={() => showModalb(lstTask.taskId)}> Comment </button>
                                                            <button className="btn-delete-task" onClick={() => showConfirm(lstTask.taskId, user.accessToken, taskId)}> DELETE </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="mt-[20px] ml-2">
                <Link className="btn-create-task" to={`/task/${taskId}/createTask`}>Create Task</Link>
            </div>
            <Modal
                title="Comments"
                open={open}
                onOk={handleOkb}
                confirmLoading={confirmLoading}
                onCancel={handleCancelb}
            >
                <div >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <textarea
                            style={{ border: "1px solid #000", width: '100%' }}
                            cols="70"
                            rows="5"
                            placeholder="Comment..."
                            {...register("contentComment")}
                        />
                        {rederbut ? (
                            <button className="bg-blue-500 p-2 rounded-md text-white text-[18px] hover:bg-blue-700">Update</button>
                        ) : (
                            <button className="bg-green-500 p-2 rounded-md text-white text-[18px] hover:bg-green-700" >Comment</button>
                        )}
                    </form>
                </div>
                <div>
                    <div >
                        {comment.map((com) => {
                            return (
                                <div className="flex border-b-2 border-black pb-2">
                                    <span className="text-[20px] font-bold">{com.user.name}:</span>
                                    <span className="ml-5 text-[16px] mt-[6px]" style={{ width: '78%' }}>{com.contentComment}</span>

                                    <div className="mt-[6px]">
                                        <button
                                            className='border-2	border-green-500 pl-1 pr-1 ml-2'
                                            onClick={() => {
                                                handleGetdetail(com);
                                            }}
                                        >
                                            <i className="fa-regular fa-pen-to-square text-green-500"></i>
                                        </button>
                                        <button
                                            className='border-2 border-red-500 pl-1 pr-1 ml-2'
                                            onClick={() =>
                                                handleDeleteComment(com.id, acces, com.taskId)
                                            }
                                        >
                                            <i className="fa-sharp fa-solid fa-trash text-red-500"></i>
                                        </button>
                                        {rederbut ? (
                                            <button
                                                className='border-2	border-blue-500 pl-1 pr-1 ml-2'
                                                onClick={() => {
                                                    setRenderbut(false);
                                                    setValue("contentComment", "");
                                                    setValue("id", "");
                                                }}
                                            >
                                                <i className="fa-solid fa-rotate-right text-blue-500"></i>
                                            </button>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Modal>
        </Layout>
    )
}

export default ListTask