import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
function AuthorProfile() {
  return (
    <div className='author-profile'>
      <ul className="d-flex justify-content-around list-unstyled fs-3">
        <li className="nav-item">
          <button className='btn btn-info' style={{}}>
          <NavLink className="nav-link" to = 'articles'>Articles</NavLink>
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-secondary">
          <NavLink className="nav-link" to = 'article'>Add a new Article</NavLink>
          </button>
        </li>
      </ul>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthorProfile
