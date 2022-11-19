import React, { useState, useEffect } from 'react';
import {
    getAllProject,
    deleteProject,
    getUser,
    assignUserProject,
    removeUser
} from '../../store/projectReducer/projectReducer';
import { getProjectDetails } from '../../store/taskReducer/taskReducer';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Modal, Table } from 'antd';
import Swal from 'sweetalert2';
import {
    ExclamationCircleOutlined,
    PlusCircleOutlined,
    DeleteOutlined
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;
const { confirm } = Modal;
const ListProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: projects, dataUser: users } = useSelector((state) => state.projectReducer);
    const { dataPD: tasks } = useSelector((state) => state.taskReducer);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        dispatch(getAllProject());
    }, []);
    const { handleSubmit, setValue } = useForm({
        defaultValues: {
            projectId: "",
            userId: "",
        },
    });
    const handleDelete = (projectId, values) => {
        dispatch(deleteProject({ projectId, values }));
    }
    const showConfirm = (projectId, values) => {
        confirm({
            title: "Bạn có muốn xóa Project này không?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                handleDelete(projectId, values);
            }
        });
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleClick = () => {
        navigate('/');
    };
    const handleAddProject = () => {
        navigate("/addproject");
    };
    const handleUser = () => {
        navigate('/user');
    };
    const handleGetProjectDetail = (taskId) => {
        dispatch(getProjectDetails({ taskId }));
    };
    const handleGetUser = (values) => {
        dispatch(getUser(values));
    };
    const UpdateProject = (projectId) => {
        navigate(`/updateproject/${projectId}`);
    };
    const handleTask = (projectId) => {
        navigate(`/task/${projectId}`);
    };
    const handleChange = (e) => {
        const type = e.target.value;
        setValue("userId", type);
    };
    const onSubmit = async (values) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const acces = user.accessToken;
        try {
            await dispatch(assignUserProject({ values })).unwrap();
            dispatch(getProjectDetails());
            Swal.fire({
                icon: 'success',
                title: "Thêm user thành công",
            })
        }
        catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Thêm user thất bại',
                text: err
            });
        }
    };
    const removeUsers = (projectId, userId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch(removeUser({ values: { projectId, userId } }));
    };

    if (!user) {
        return <Navigate to='/login' />;
    }
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Project Name",
            dataIndex: "projectName",
        },
        {
            title: "Calegory",
            dataIndex: "calegory",
        },
        {
            title: "Creator",
            dataIndex: "creator",
        },
        {
            title: "Members",
            dataIndex: "members",
        },
        {
            title: "Action",
            dataIndex: "action",
        },
    ];
    const data = [];
    for (let i = 0; i < projects?.length; i++) {
        let pro = projects[i];
        data.push({
            key: i,
            id: <p className='text-black font-bold'>{pro.id}</p>,
            projectName: <a onClick={() => handleTask(pro.id)}
                style={{ wordBreak: "break-word" }}
            >
                <span className='text-blue-500 font-bold hover:text-blue-700 cursor-pointer	'>
                    {pro.projectName.slice(0, 35)}
                </span>
                <p>{pro.projectName.slice(35)}</p>
            </a>,
            calegory: <p>{pro.categoryName}</p>,
            creator: <p>{pro.creator.name}</p>,
            members: <div style={{ display: 'flex' }}>
                {pro.members.map((member) => {
                    return (
                        <img key={member.userId} style={{ height: '30px', marginLeft: '10px' }}
                            src={member.avatar}
                        ></img>
                    )
                })}
                <button
                    onClick={() => {
                        showModal();
                        handleGetProjectDetail(pro.id, user.accessToken);
                        handleGetUser(user.accessToken);
                    }}
                    className='border-2	border-green-500 pl-1 pr-1 ml-2'>
                    <i className="fa-sharp fa-solid fa-user-plus text-green-400"></i>
                </button>
            </div>,
            action: <>
                <button
                    className='border-2 border-green-500 pl-1 pr-1 ml-2 '
                    onClick={() => UpdateProject(pro.id)}>
                    <i className="fa-solid fa-pen-to-square text-green-400"></i>
                </button>
                <button
                    className='border-2 border-red-500 pl-1 pr-1 ml-2'
                    onClick={() => {
                        showConfirm(pro.id, user.accessToken)
                    }}>
                    <i className="fa-sharp fa-solid fa-trash text-red-500"></i>
                </button>
            </>
        })
    }
    return (
        <div>
            <Modal
                title="Members"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <table>
                    <thead>
                        <tr>
                            <th style={{ padding: "5px 40px" }}>Id</th>
                            <th style={{ padding: "5px 40px" }}>Avatar</th>
                            <th style={{ padding: "5px 40px" }}>Name</th>
                            <th style={{ padding: "5px 40px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.members?.map((member) => {
                            return (
                                <tr key={member.userId}>
                                    <td style={{ padding: "5px 40px" }}>{member.userId}</td>
                                    <td style={{ padding: "5px 40px" }}>
                                        <img src={member.avatar}></img>
                                    </td>
                                    <td style={{ padding: "5px 40px" }}>{member.name}</td>
                                    <td style={{ padding: "5px 40px" }}>
                                        <button
                                            onClick={() => removeUsers(tasks.id, member.userId)}

                                        >
                                            <DeleteOutlined />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <h4>Add User</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select onChange={handleChange}>
                        <option value="">chọn user</option>
                        {users.map((usera) => {
                            return (
                                <option key={usera.userId} value={usera.userId}>
                                    {usera.name}
                                </option>
                            );
                        })}
                    </select>
                    <button >
                        <PlusCircleOutlined />
                    </button>
                </form>
            </Modal>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default ListProject





