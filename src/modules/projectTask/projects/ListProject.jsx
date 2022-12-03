import React, { useState, useEffect } from 'react';
import {
    getAllProject,
    deleteProject,
    getUser,
    assignUserProject,
    removeUserz
} from '../../../store/projectReducer/projectReducer';
import { getProjectDetails } from '../../../store/taskReducer/taskReducer';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Modal, Table } from 'antd';
import Swal from 'sweetalert2';
import {
    ExclamationCircleOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import './listProject.scss'
import { logout } from '../../../store/authReducer/authReducer';

const { Header } = Layout;
const { confirm } = Modal;
const ListProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: projects, listuser: users } = useSelector((state) => state.project);
    const { data1: tasks } = useSelector((state) => state.task);
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
    const handleGetProjectDetail = (taskId, acce) => {
        dispatch(getProjectDetails({ taskId, acce }));
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
    const handleChange2 = e => {
        const type = e.target.value;
        setValue("projectId", type)
    }
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    }
    const onSubmit = async (values) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const acces = user.accessToken;
        try {
            await dispatch(assignUserProject({ values, acces })).unwrap();
            dispatch(getProjectDetails());
            Swal.fire({
                icon: 'success',
                title: "Thêm user thành công",
            })
        }
        catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Thêm user thất bại',
                text: err.content
            });
        }
    };
    const removeUser = (projectId, userId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const acces = user.accessToken;
        dispatch(removeUserz({ values: { projectId, userId }, acces }));
    }

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
        <Layout>
            <Modal
                title="Members"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <table>
                    <thead>
                        <tr>
                            <th style={{ padding: "5px 40px" }} >Id</th>
                            <th style={{ padding: "5px 40px" }}>Avatar</th>
                            <th style={{ padding: "5px 40px" }}>Name</th>
                            <th style={{ padding: "5px 40px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.members?.map((member) => {
                            return (
                                <tr key={member.userId}>
                                    <td style={{ padding: "20px" }} className='text-blue-500'>{member.userId}</td>
                                    <td style={{  padding: 5 }}>
                                        <img style={{borderRadius: '50px',marginLeft:'20px'}} src={member.avatar}></img>
                                    </td>
                                    <td style={{ padding: "20px" }} className='font-bold'>{member.name}</td>
                                    <td style={{ padding: "20px" }}>
                                        <button className='border-2 border-red-500 pl-1 pr-1 ml-2'
                                            onClick={() => removeUser(tasks.id, member.userId)}
                                        >
                                            <i className="fa-sharp fa-solid fa-trash text-red-500"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <h4 className='font-bold pt-5 text-[20px]'>Add User</h4>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <select onChange={handleChange2} className='sec-ch-pro'>
                        <option value="">Chọn Project</option>
                        {projects.map((pro) => {
                            return (
                                <option key={pro.id} value={pro.id}>
                                    {pro.projectName}
                                </option>
                            );
                        })}
                    </select>
                    <select onChange={handleChange} className='sec-ch-us'>
                        <option value="">Chọn User</option>
                        {users.map((usera) => {
                            return (
                                <option key={usera.userId} value={usera.userId}>
                                    {usera.name}
                                </option>
                            );
                        })}
                    </select>
                    <button
                        className='border-2 border-green-500 pl-2 pr-2 pt-1 pb-1 ml-[30px] hover:border-green-700'
                    >
                        <i className="fa-solid fa-plus text-green-400"></i>
                    </button>
                </form>
            </Modal>
            <Header style={{ background: "white", padding: "0px", display: 'flex', justifyContent: "space-between" }}>
                <h1 className='text-project'>Project Management</h1>
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
                <Table columns={columns} dataSource={data} />
            </div>
        </Layout>
    )
}

export default ListProject





