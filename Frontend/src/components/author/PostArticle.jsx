import React from 'react'
import { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { UserAuthorContextObj } from '../../context/UserAuthorContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
function PostArticle() {

 const  navigate=useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserAuthorContextObj);
    const [error,setError]=useState("");
 
    console.log(currentUser)
  const {register, handleSubmit, formState:{errors}} = useForm()

  async function postArticle(articleObj){
    console.log(articleObj)

    // create article obj as per article schema

    const authorData = {
      nameofauthor:currentUser.firstName,
      email:currentUser.email,
  profileimageURL:currentUser.profileimageURL
    }
   
    articleObj.authorData = authorData;
    // article id (time stamp)
    articleObj.articleId = Date.now();
    // add title, category , content

    // add date of creation and date of modification
    let currentDate = new Date();
    articleObj.dateofCreation = currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()+" "+ currentDate.toLocaleTimeString("en-US", {hour12:true})

    articleObj.dateofModification = currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()+" "+ currentDate.toLocaleTimeString("en-US", {hour12:true})
    // add comments array
    articleObj.comments = [];
    // add article active state
    articleObj.isArticleActive = true;
    console.log(articleObj)
    // http post req to create new article
    let res=null;
    res=await axios.post('https://sagelog.onrender.com/author-api/article', articleObj);
    let {message,payload}=res.data;
    if(res.status===201){
      navigate(`/author-profile/${currentUser.email}/articles`)
    }else{
      setError(message);
    }
   
  }
  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3 " style={{ color: "goldenrod" }}>
                Write an Article
              </h2>
            </div>
            <div className="card-body bg-light">
              {/* {err.length!==0&&<p className='text-danger fs-5'>{err}</p>} */}
              <form onSubmit={handleSubmit(postArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title")}
                  />
                  {/* title validation err msg */}

                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select
                    {...register("category")}
                    id="category"
                    className="form-select"
                    defaultValue=""
                  >
                    <option value="" disabled>--categories--</option>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
                  </select>
                  {/* title validation err msg */}

                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    {...register("content")}
                    className="form-control"
                    id="content"
                    rows="10"
                  ></textarea>
                  {/* title validation err msg */}

                </div>

                <div className="text-end">
                  <button type="submit" className=" btn btn-success add-article-btn">
                    Post
                  </button>
                  {
                    error.length!==0&&<p>{error}</p>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostArticle
