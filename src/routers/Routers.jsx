import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../components/MainLayout/MainLayout'
import Board from '../modules/Board/Board'
import CreateProject from '../modules/CreateProject/CreateProject'
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
                }
            ]
        }
    ])
    return routing;
}

export default Routers