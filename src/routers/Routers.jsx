import React from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '../components/MainLayout/MainLayout';
import Board from '../modules/Board/Board';
import CreateProject from '../modules/CreateProject/CreateProject';
import ListProject from '../modules/ListProject/ListProject';
import UpdateProject from '../modules/updateProject/UpdateProject';
const Routers = () => {
    const routing = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <Board />
                },
                {
                    path: '/createProject',
                    element: <CreateProject />
                },
                {
                    path: '/listProject',
                    element:<ListProject />
                },
                {
                    path:'/updateproject/:projectId',
                    element:<UpdateProject />
                }
            ]
        }
    ])
    return routing;
}

export default Routers