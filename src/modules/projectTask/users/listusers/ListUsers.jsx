import React, { useEffect, useState } from 'react'
import { Layout, Table, Modal } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUser } from '../../../../store/userReducer/userReducer';
import { logout } from '../../../../store/authReducer/authReducer';
import {ExclamationCircleOutlined,} from "@ant-design/icons";
const { Header } = Layout;
const { confirm } = Modal;
const ListUser = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const { users } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const userz = JSON.parse(localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        dispatch(getAllUser());
    }, []);

    const showConfirm = (userIds) => {
        confirm({
            title: "Bạn có muốn xóa người dùng ?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                handleDelte(userIds);
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const handleDelte = (userIds) => {
        dispatch(deleteUser({ userId: userIds, acc: userz.accessToken }));
    };
    const handleSelect = (user) => {
        localStorage.setItem("userdetail", JSON.stringify(user));
        navigate(`/user/${user.userId}`);
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
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
            title: "Avatar",
            dataIndex: "avatar",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
        },
        {
            title: "Action",
            dataIndex: "action",
        },
    ];
    const data = [];
    for (let i = 0; i < users?.length; i++) {
        let us = users[i];
        data.push({
            key: i,
            id: <p>{us.userId}</p>,
            avatar: <img src={us.avatar} style={{ height: '30px' }} alt="" />,
            name: <p>{us.name}</p>,
            email: <p>{us.email}</p>,
            phoneNumber: <p>{us.phoneNumber}</p>,
            action: <>
                <button
                    className='border-2 border-green-500 pl-1 pr-1 ml-2 '
                    onClick={() => handleSelect(us)}
                >
                    <i className="fa-solid fa-pen-to-square text-green-400"></i>
                </button>
                <button
                    className='border-2 border-red-500 pl-1 pr-1 ml-2'
                    onClick={() => showConfirm(us.userId)}><i className="fa-sharp fa-solid fa-trash text-red-500"></i>
                    </button>
                </>
            })
    
        }
        return (
            <Layout>
                <Header style={{ background: "white", padding: "0px", display: 'flex', justifyContent: "space-between" }}>
                    <h1 className='text-project'>Users Management</h1>
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
    
    export default ListUser