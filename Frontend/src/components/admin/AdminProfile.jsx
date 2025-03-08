import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
function AdminProfile() {
  return (
    <div className='author-profile'>
      <ul className="d-flex justify-content-center list-unstyled fs-3">
        <li className="nav-item">
          <NavLink className="nav-link" to = 'articles'>Articles</NavLink>
          
        </li>
        
      </ul>
      <div className="">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminProfile
