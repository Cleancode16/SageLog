import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signupimg from '../../Images/signup1.svg'
import './signup.css'
function Signup() {
  return (
    
    <div class="container">
    <div class="row">
      <div class="col">
     <img src={Signupimg} className='signupimg' alt="" srcset="" />
      </div>
      <div class="col mt-5">
   
      <SignUp/>
      
  
      </div>
    </div>
    </div>
  )
}

export default Signup