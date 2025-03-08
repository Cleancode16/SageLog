import React from 'react'
import {SignIn} from '@clerk/clerk-react'
import signinImg from '../../Images/signin.svg'
import './signup.css'
function Signin() {
  return (
   
     
     <div class="container">
     <div class="row">
       <div class="col">
      <img src={signinImg} className='signinimg' alt="" srcset="" />
       </div>
       <div className='col signup-form'>
      <SignIn/>
    </div>
     </div>
     </div>
  )
}

export default Signin