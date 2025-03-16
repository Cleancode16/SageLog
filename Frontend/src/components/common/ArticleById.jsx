import React, { useState } from 'react'
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { MdBlock } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { UserAuthorContextObj } from '../../context/UserAuthorContext';
import {FaEdit,FaSave} from 'react-icons/fa';
import {MdDelete,MdRestore} from 'react-icons/md'
import axios from 'axios';
import {useAuth} from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom';
import './Header.css'

function ArticleById() {
const {register,handleSubmit,formState:{errors},reset}=useForm();
const navigate=useNavigate();
const {getToken}=useAuth();
const {state}= useLocation();
const {currentUser}=useContext(UserAuthorContextObj);
const [currentArticle,setCurrentArticle]=useState(state);
if(!state) return <p>Loading article...</p>

  const [editArticleState, setEditArticleState]=useState(false)
  function enableEdit() {
    console.log(state.authorData.nameofauthor);
    setEditArticleState(true);
  }

  async function onSave(modifiedObj) {
    const articleAfterChanges={...state,...modifiedObj};
    //add date of modification
    const currentDate=new Date();
    articleAfterChanges.dateofModification=currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()+" "+ currentDate.toLocaleTimeString("en-US", {hour12:true});

    //make http put rrequest
    const token=await getToken();
    let res=await axios.put(`https://sagelog.onrender.com/author-api/article/${articleAfterChanges.articleId}`,articleAfterChanges,{headers:{
      Authorization:`Bearer ${token}`
    }});
    if(res.status===200){
      //change edit article status to false
      console.log('successfully updated the article');
      navigate(`/author-profile/articles/${state.articleId}`,{state:res.data.payload});
      setEditArticleState(false);
    }

  }
  //delete article function
  async function deleteArticle(){
    state.isArticleActive=false;
  let res=await axios.put(`https://sagelog.onrender.com/author-api/article/update/${state.articleId}`,state);
  if(res.status==200){
    console.log("successfully deleted");
   setCurrentArticle(res.data.payload);
  }
  }
  //restore Article
  async function restoreArticle(){
    console.log('restore');
    state.isArticleActive=true;
    let res=await axios.put(`https://sagelog.onrender.com/author-api/article/update/:articleId${state.articleId}`,state);
    if(res.status==200){
      console.log("successfully restored");
      setCurrentArticle(res.data.payload);
    }
  }

  // blocking article function
  async function blockArticle(){
    state.isArticleActive=false;
    let res=await axios.put(`https://sagelog.onrender.com/admin-api/block/:articleId${state.articleId}`,state);
    if(res.status==200){
      console.log("successfully blocked");
      setCurrentArticle(res.data.payload);
    }
  }
  
  {/* comment state */}
  const [commentState, setCommentState] = useState('')

    {/* add comment function */}
async function addComment(commentObj) {
    try {
        console.log('Comment object:', commentObj);
        commentObj.nameofuser = currentUser.firstName;
        commentObj.comment = commentObj.comments;  
        commentObj.commentId = Date.now();
        let res = await axios.put(
            `https://sagelog.onrender.com/user-api/comment/${currentArticle.articleId}`,
            commentObj
        );
    if (res.status === 200) {
            console.log("Successfully added comment");
            setCommentState("Comment added successfully!");
            setCurrentArticle(res.data.payload);
            reset();  // Clear form
        } else {
            console.log("Error adding comment", res);
        }
    } catch (error) {
        console.error("Error in adding comment:", error);
    }
}

    

    console.log(currentUser.role);
  return (
    <div className='container'>
      {
        editArticleState===false ? 
        <>
          {/* print full article*/}
          <div className="d-flex justify-content-between "> 
              <div className="author-block w-100 px-4 py-2 rounded-2 d-flex justify-content-between align-items-center articlecard">
                <div className='articleBanner'>
                  <p className="fs-1 me-4">{currentArticle.title}</p>
               
                  {/* doc & dom */}
                  <span className="py-3">
                    <small className="text-light me-4">
                      created on:{currentArticle.dateofCreation}
                    </small>
                    <small className="text-light me-4">
                    Modified on:{currentArticle.dateofModification}
                    </small>
                  </span>
                </div>
                {/* author details */}
                <div className="author-deatils text-center">
                  <div className="mt-4">
                    <img src={currentArticle.authorData.profileimageURL} width='60px' className='rounded-circle'alt="" />
                    <p>{currentArticle.authorData.nameofauthor}</p>
                  {
                  (currentUser.role === 'author' && currentUser.firstName === currentArticle.authorData.nameofauthor)&&<> {/* edit & delete */}
                  <button className='me-2 btn btn-light h-100 bg-secondary mt-5' height='40px' onClick={()=>enableEdit()}>
                  <FaEdit className='text-warning'/>
                  </button>
                  {/* if article is active ,display delete icon,otherwise display restore icon */}

                  {
                  currentArticle.isArticleActive===true?(<button className="btn btn-light h-100 mt-5 bg-secondary" onClick={()=>deleteArticle()}>
                  <MdDelete className='h-50 text-danger fs-4'/>
                  </button>
                  ):(<button className='btn btn-secondary h-100 mt-5' onClick={()=>restoreArticle()}>
                  <MdRestore className=' m-2 text-info fs-4' />
                  </button>)
              }</>
            }
            </div>
                </div>
                
            {
              currentUser.role==='admin'&&<> {/* edit & delete */}
           
            {/* if article is active ,display delete icon,otherwise display restore icon */}

            {
              currentArticle.isArticleActive===true?(<button className='btn editRestoreButton btn-light bg-light ' onClick={()=>deleteArticle()}>
                <MdBlock className=' m-2 text-info fs-4' />
              </button>
                 ):(<button className='btn editRestoreButton btn-light' onClick={()=>restoreArticle()}>
                 <MdRestore className=' m-2   text-info fs-5' />
               </button>)
             }</>
            }
              </div>
              
            </div>

            {/* contents */}
            <p className="fs-5 mt-3 article-content bg-light p-3 rounded-3 paracontent" style={{whiteSpace:"pre-line"}}>{currentArticle.content}</p>
            {/* user comments */}
            <div>
              <div className="comments">
            <p className='fs-3 fw-bold'><MdComment className='fs-1 m-2' /> Comments</p>  
            { 
            currentArticle.comments.length===0?<p className='dispaly-3'>No Comments yet...</p>:
            
              currentArticle.comments.map((commentObj)=>{
                return <div key={commentObj._id}>
                         <div className="card m-2 p-3 bg-secondary">
                         <p className='user-name text-light fw-semibold fs-5 '>
                            {commentObj?.nameofuser}
                          </p>
                     
                          <p className="comment text-light fs-6">
                            {commentObj?.comment}
                         </p></div> 
                        
                       

                        </div>
              }
              )
             
            }
          </div>
        </div>
        {/* comment form */}
        {
          <h1>{commentState}</h1>
        }
        {
          currentUser.role === 'user' && <form onSubmit={handleSubmit(addComment)}>
            <input type="text" id="comment" {...register('comments')} className="form-control mb-4" />
            <button className='btn btn-success mb-3'>Add a comment</button>
          </form>
        }
            
        </>:
        <>
          {/* form  */}
          <h1>Edit Article</h1>
          <form onSubmit={handleSubmit(onSave)} >
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    defaultValue={currentArticle.title}
                    {...register('title')}
                 
                  />
                  {/* title validation err msg */}

                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select
               
                    id="category"
                    className="form-select"
                    defaultValue={currentArticle.category}
                    {...register('category')}
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
                  
                    className="form-control"
                    id="content"
                    rows="10"
                    defaultValue={currentArticle.content}
                    {...register('content')}
                  ></textarea>
                  {/* title validation err msg */}

                </div>

                <div className="text-end">
                  <button type="submit" className=" btn btn-success add-article-btn">
                    Post
                  </button>
                
                </div>
              </form>
        </>
      }
      


        
    </div>
  )
}

export default ArticleById
