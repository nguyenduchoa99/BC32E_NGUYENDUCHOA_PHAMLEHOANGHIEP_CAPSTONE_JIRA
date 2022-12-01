import React from 'react'
import { useRoutes } from 'react-router-dom';
import MainLayout from '../components/MainLayout/MainLayout'
import CheckLogin from '../modules/projectTask/projects/CheckLogin';
import CreateProject from '../modules/projectTask/projects/CreateProject';
import ListProject from '../modules/projectTask/projects/ListProject';
import UpdateProject from '../modules/projectTask/projects/UpdateProject';
import CreateTask from '../modules/projectTask/task/CreateTask';
import ListTask from '../modules/projectTask/task/ListTask';
import UpdateTask from '../modules/projectTask/task/UpdateTask';

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
    ])
    return routing
}

export default Routers