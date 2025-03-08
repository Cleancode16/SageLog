import React from 'react'
import './Header.css'
import { FaRegCopyright } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <div className='p-2  text-white text-center display-4 footer'>
      <div className="row">
        <div className="col">
          <p className='fw-semibold fs-4'>Features</p>
          <ul className="list-unstyled">
            <li className='fs-5 mt-1'>
              Home
            </li>
            <li className='fs-5 mt-1'>
              Sign up
            </li>
            <li className='fs-5 mt-1'>
              Sign In
            </li>
          </ul>
        </div>
        <div className="col ms-5">
     
      <ul className="list-unstyled d-flex mt-4">
        <li> <FaGithub className='fs-2 ms-3 text-center' /></li>
        <li> <FaLinkedin className='fs-2 ms-3' /></li>
     
        <li> 
        <FaInstagram className='fs-2 ms-3'/></li>
       
      </ul>
      <p className="text-center fs-6 fw-semibold me-4">
        Copyright <FaRegCopyright /> SageLog ,All Rights Reserved
        </p>
    

        </div>
        <div className="col">
        <p className='fs-4 fw-semibold'>Contact Us</p>
        <ul className="list-unstyled">
        <li><p className='fs-5 text-center fw-semibold'>Sagelog@gmail.ocm</p> </li>
        <li><p className='fs-5 text-center fw-semibold'>+91 9876543210</p> </li>
        <li><p className='fs-5 text-center fw-semibold'>Hyderabad,Telangana</p> </li>
      </ul>
        </div>
       
      </div>
    </div>
  )
}

export default Footer