import React from 'react'
import { NavLink } from 'react-router-dom'
import './menuLayout.scss'
const MenuLayout = () => {
    return (
        <div className='menu'>
            <NavLink className='logo'>
                <i className="fa-brands fa-jira mr-3"></i>
                <span className='item-span'>JIRA</span>
            </NavLink>
            <div className="menu-item">
                <NavLink to='/createProject' className='item'><i className="fa-solid fa-gear mr-3"></i><span className='item-span'>Create Project</span></NavLink>
                <NavLink to='/listProject' className='item'><i className="fa-solid fa-list mr-3"></i><span className='item-span'>List Project</span></NavLink>
                <NavLink to='/createUser' className='item'><i className="fa-solid fa-user-plus mr-3"></i><span className='item-span'>Create User</span></NavLink>
                <NavLink to='/user' className='item'><i className="fa-solid fa-users mr-3"></i><span className='item-span'>List User</span></NavLink>

            </div>
            <div className='about'>
                <a className='about-menu'>
                    <i className="fa-regular fa-circle-question mr-3"></i>
                    <span className='item-span'>About</span>
                </a>
            </div>
        </div>
    )
}

export default MenuLayout