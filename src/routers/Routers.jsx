import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../components/MainLayout/MainLayout'
const Routers = () => {
    const routing = useRoutes([
        {
            path:'/',
            element:<MainLayout />,
            children:[
                {

                }
            ]
        }
    ])
  return routing;
}

export default Routers