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
                <NavLink to='/' className='item'><i className="fa-solid fa-credit-card mr-2"></i> <span className='item-span'>Board</span></NavLink>
                <NavLink to='/createProject' className='item'><i className="fa-solid fa-gear mr-3"></i><span className='item-span'>Create Project</span></NavLink>
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