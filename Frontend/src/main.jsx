import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css'
import UserAuthorContext from './context/UserAuthorContext.jsx'

import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import RootLayout from './components/RootLayout.jsx';
import Signup from './components/common/Signup.jsx';
import Signin from './components/common/Signin.jsx';
import Home from './components/common/Home.jsx';
import UserProfile from './components/user/UserProfile.jsx';
import AuthorProfile from './components/author/AuthorProfile.jsx';
import PostArticle from './components/author/PostArticle.jsx';
import Articles from './components/common/Articles.jsx';
import ArticleById from './components/common/ArticleById.jsx';
import AdminProfile from './components/admin/AdminProfile.jsx';
const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
        path:"",
        element:<Home/>
      }, {
        path:"signin",
        element:<Signin/>
      },{
        path:"signup",
        element:<Signup/>
      },{
        path:"user-profile/:email",
        element:<UserProfile/>,
        children:[
          {
            path:'articles',
            element:<Articles/>
          },{
            path:':articleId',
            element:<ArticleById/>
          },{
            path:"",
            element:<Navigate to="articles" />
          }
        ]
      },{
        path:"author-profile/:email",
        element:<AuthorProfile/>,
        children:[
          {
            path:'articles',
            element:<Articles/>
          },{
            path:':articleId',
            element:<ArticleById/>
          },{
            path:"",
            element:<Navigate to="articles" />
          },{
            path:'article',
            element:<PostArticle/>
          }
        ]
      },
      {
        path:"admin-profile/:email",
        element:<AdminProfile/>,
        children:[
          {
            path:'articles',
            element:<Articles/>
          },{
            path:':articleId',
            element:<ArticleById/>
          },{
            path:"",
            element:<Navigate to="articles" />
          }
        ]
      }
    ]
  },  {
    path:"/postarticle",
    element:<PostArticle/>
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <UserAuthorContext>
   <RouterProvider router={browserRouterObj}/>
   {/* <App /> */}
   </UserAuthorContext>
   
    
  
  </StrictMode>,
)
