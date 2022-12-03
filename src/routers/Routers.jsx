import React from 'react'
import { useRoutes } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import MainLayout from '../components/MainLayout/MainLayout'
import Login from '../modules/Authentication/Page/Login/Login';
import Register from '../modules/Authentication/Page/Register/Register';
import CheckLogin from '../modules/projectTask/projects/CheckLogin';
import CreateProject from '../modules/projectTask/projects/CreateProject';
import ListProject from '../modules/projectTask/projects/ListProject';
import UpdateProject from '../modules/projectTask/projects/UpdateProject';
import CreateTask from '../modules/projectTask/task/CreateTask';
import ListTask from '../modules/projectTask/task/ListTask';
import UpdateTask from '../modules/projectTask/task/UpdateTask';
import CreateUser from '../modules/projectTask/users/creusers/CreateUsers';
import ListUser from '../modules/projectTask/users/listusers/ListUsers';
import UpdateUser from '../modules/projectTask/users/upusers/UpdateUsers';

const Routers = () => {
    const routing = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path:'/',
                    element:<CheckLogin />
                },
                {
                    path: '/createProject',
                    element: <CreateProject />
                },
                {
                    path: '/listProject',
                    element: <ListProject />
                },
                {
                    path: '/updateProject/:projectId',
                    element: <UpdateProject />
                },
                {
                    path: '/createUser',
                    element: <CreateUser />
                },
                {
                    path: '/user',
                    element: <ListUser />
                },
                {
                    path: '/user/:userId',
                    element: <UpdateUser />
                },
                {
                    path: '/task/:taskId',
                    element: <ListTask />
                },
                {
                    path: '/task/:taskId/createTask',
                    element: <CreateTask />
                },
                {
                    path: '/task/updatetask/:taskId',
                    element: <UpdateTask />
                }
            ]
        },
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/register',
                    element: <Register />
                }
            ]
        }
    ])
    return routing
}

export default Routers