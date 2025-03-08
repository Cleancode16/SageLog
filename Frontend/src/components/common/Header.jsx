import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { useClerk ,useUser} from '@clerk/clerk-react';
import { useContext } from 'react';
import { UserAuthorContextObj } from '../../context/UserAuthorContext';

function Header() {
  const {signOut}=useClerk();
  const {isSignedIn,isLoaded,user}=useUser();
  const {currentUser,setcurrentUser}=useContext(UserAuthorContextObj);
  const navigate=useNavigate();
  async function handleSignOut(){
  await signOut();
  localStorage.removeItem("currentUser");  
  setcurrentUser(null);  
  navigate('/');
  try {
    await signOut();  // Call signOut after redirecting
} catch (error) {
    console.error("Sign-out failed:", error);
}
  }
  return (
    <div >
      <nav className='header d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-center '>
          <Link to='/' className='mt-3 ms-5'><p className='fw-bold fs-4'>SageLog</p></Link></div>
          <ul className="d-flex fw-semibold fs-5 justify-content-around list-unstyled header-links  mx-5 ">
            <li className='mx-3 mt-3'>
              <Link to=''>Home</Link>
            </li>
            {
                  !isSignedIn?
                  <><li className='mx-3 mt-3'>
                  <Link to='signin'>signin</Link>
                </li>
                <li className='signup mt-3'>
                  <Link to='signup'>signup</Link>
                </li>
                </>
                :<div  className='user-button'>
                  
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle border-0 bg-dark rounded-2 p-1 m-2"
                      id="navbarDropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src={user.imageUrl}
                        width="50px"
                        className="rounded-circle"
                        alt="User"
                      />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end bg-gradient-light text-dark" aria-labelledby="navbarDropdownMenuLink">
                      <li>
                        <p className="role text-end text-center px-3">Role : {currentUser.role}</p>
                      </li>
                      <li>
                        <p className="user-name text-center px-3">Name : {user.firstName}</p>
                      </li>
                      <li>
                        <button className="btn  signoutButton" onClick={handleSignOut}>
                          <p className='fw-bold text-center '>Sign Out</p>
                        </button>
                      </li>
                      
                    </ul>
                  </li>

                </div>

            }
           
          </ul>
      </nav>
    </div>
  )
}

export default Header
