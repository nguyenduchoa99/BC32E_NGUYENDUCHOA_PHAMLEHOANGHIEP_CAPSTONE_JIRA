import React from 'react'
import { Navigate } from 'react-router-dom';

const CheckLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return <Navigate to='/login' />;
    }
  return (
    <div></div>
  )
}

export default CheckLogin