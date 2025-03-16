import {useUser} from '@clerk/clerk-react'
import { useContext,useEffect,useState } from 'react'
import { UserAuthorContextObj } from '../../context/UserAuthorContext'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import Homeimg from '../../Images/home.svg'
import { useRef } from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import './Header.css'
import { MdAdminPanelSettings } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom'
function Home() {
  const navigate=useNavigate();
 const {currentUser,setCurrentUser}=useContext(UserAuthorContextObj);

 const {isSignedIn,user,isLoaded}=useUser();
 console.log("isSignedIn:",isSignedIn);
 console.log("User:",user);
 console.log("isLoaded",isLoaded);
 const [error,setError]=useState("");

 
async function onSelectRole(role){
  //clear error Property
  setError('')
const selectedRole=role;
console.log(selectedRole);
currentUser.role=selectedRole;
console.log(currentUser.role);
let res=null;
if(selectedRole==='author'){
res=await axios.post('https://sagelog.onrender.com/author-api/author',currentUser);

let {message,payload}=res.data;
if(message==='author'){
  setCurrentUser({...currentUser,...payload})
  //save user to local storage
  localStorage.setItem("currentUser",JSON.stringify(payload))
}else{
  setError(message);
}
}
if(selectedRole==='admin'){
  res=await axios.post('https://sagelog.onrender.com/admin-api/admin',currentUser);
  
  let {message,payload}=res.data;
  if(message==='admin'){
    setCurrentUser({...currentUser,...payload})
    //save user to local storage
    localStorage.setItem("currentUser",JSON.stringify(payload))
  }else{
    setError(message);
  }
  }

if(selectedRole==='user'){
  res=await axios.post('https://sagelog.onrender.com/user-api/user',currentUser);
  let {message,payload}=res.data;
if(message==='user'){
  setCurrentUser({...currentUser,...payload})
   //save user to localstorage
   localStorage.setItem("currentUser",JSON.stringify(payload))
}else{
  setError(message);
}
}

}
useEffect(()=>{
  if(isSignedIn===true){
  setCurrentUser({...currentUser,
    firstName:user?.firstName,
    lastName:user?.lastName,
    email:user?.emailAddresses[0].emailAddress,
    profileimageURL:user?.imageUrl
  });
}
  
  },[isLoaded]);
  useEffect(()=>{
    
    if(currentUser?.role==='user'&&error.length===0){
      navigate(`/user-profile/${currentUser.email}`)
    }
    if(currentUser?.role==='author'&&error.length===0){
      navigate(`/author-profile/${currentUser.email}`)
    }
  
    if(currentUser?.role==='admin'&&error.length===0){
      navigate(`/admin-profile/${currentUser.email}`)
    }
  },[currentUser])
  const Typewriter = ({ text, speed = 100, delay = 800 }) => {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex((prevIndex) => prevIndex + 1);
        
        if (index === text.length) {
          setTimeout(() => {
            setIndex(0);
            setDisplayText("");
          }, delay);
        }
      }, speed);
  
      return () => clearInterval(interval);
    }, [index, text, speed, delay]);
    return <h1 className="info">{displayText}</h1>;
  };
  return (
    <div className='container'>{
      isSignedIn===false&&<div>
        <div className="row">
          <div className="col">
          <img src={Homeimg} className='homeimg'alt="" />
          </div>
          <div className="col">
          <Typewriter text="Welcome to SageLog" speed={100} />
            <p className="para">
            SageLog is your personal space to write, share, and explore amazing blogs. Whether you're a reader, an author, or an admin, our platform provides a seamless experience for everyone.
            </p>
            <button className="btn btn-dark ms-5" ><Link to='signup' className='text-decoration-none text-light'>Get started</Link></button>
          </div>
        </div>
      
      </div>
    }
    {
      isSignedIn==true&&<div><div className='d-flex justify-content-around align-items-center p-3 rounded-3 profile bg-dark'>
     <img src={user.imageUrl} width='100px'className='rounded-circle'></img>
       <p className='display-4 mt-3 text fw-bold' >
          {user.fullName}
          <br/>
          <p className='fs-6 mt-3 ms-2 text fw-semibold' >
          {user.emailAddresses[0].emailAddress}</p>
          </p>
         
          </div>
          <div className="card m-3">
          <p className='m-3 text-center fs-6'>
              Welcome! Choose your role to get started. The Sage Log records your interactions, helping you track your journey and access resources seamlessly.
              </p>
             
          </div>
         
          <p className="text-center fs-2 fw-semibold text-dark mt-3">Select Role</p>
          {error.length!==0&&<p className='text-danger fs-5' style={{fontFamily:'sans-serif'}}>{error}</p>}
          <div className='d-flex role-radio py-3 justify-content-center '>
       
            
            <div className="container">
              <div className="row">
                <div className="text-center p-3 
              rounded-4 m-2  col card1" >
               
                  <button onClick={()=>onSelectRole('admin')} className='admin btn btn-dark'>  
                    <MdAdminPanelSettings className='adminIcon'/>

                  <p className="text-center  fw-semibold m-2 fs-4">admin</p>
                </button>
             
          
                </div>
                <div className="col text-center  p-3 
            rounded-4  m-2 card1">
              
                  <button onClick={()=>onSelectRole('author')} className='btn btn-dark admin'> 
                  <TfiWrite className='adminIcon'/>
                  <p className="text-center  fw-semibold m-2 fs-4">author</p>
               </button>
            
                
               
                </div>
                <div className="col p-3 
              rounded-4 text-center m-2 card1">
                
                  <button onClick={()=>onSelectRole('user')} className='admin btn btn-dark'>
                  <FaUser className='adminIcon'/>
                  <p className="text-center  fw-semibold m-2 fs-4">User</p>
                 </button>
               
             
               
                 
                </div>
              </div>
            
            </div>
        </div>
       
         </div> 
}</div>
  )
}

export default Home
