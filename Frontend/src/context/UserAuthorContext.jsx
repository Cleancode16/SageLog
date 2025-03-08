import React, { useEffect } from 'react'
import { createContext,useState } from 'react'


export const UserAuthorContextObj=createContext();
function UserAuthorContext({children}) {
 let [currentUser,setCurrentUser]=useState({
  firstName:'',
  lastName:'',
  email:'',
  profileimageURL:'',
  role:''
 })
 useEffect(() => {
  const userInStorage = localStorage.getItem('currentUser');
  if (userInStorage) {
    setCurrentUser(JSON.parse(userInStorage))
  }
}, [])
  return (
    <UserAuthorContextObj.Provider value={{currentUser,setCurrentUser}}>
      {children}
    </UserAuthorContextObj.Provider>
  )
}

export default UserAuthorContext