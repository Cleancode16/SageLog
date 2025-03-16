import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import axios from 'axios'
import {useAuth} from '@clerk/clerk-react'
import { useForm } from 'react-hook-form'
import './Header.css'
import { UserAuthorContextObj } from '../../context/UserAuthorContext'
function Articles() {
  const {register,handleSubmit,formState:{errors}}=useForm();
  const [search,setSearch]=useState('');
  const [genre,setGenre]=useState('');
  console.log(search)
  console.log(JSON.stringify(genre, null, 2));

  const navigate=useNavigate();
  const {currentUser}=useContext(UserAuthorContextObj);
  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')
  const {getToken}=useAuth();
  async function getArticles() {
    //get jwt token
    const token=await getToken();
     if(currentUser.role==='admin'||currentUser.role==='author'){
      //make authenticated request
      let res = await axios.get('https://sagelog.onrender.com/author-api/articles',{headers:{
        Authorization:`Bearer ${token}`
     }})
     console.log('articles')
     if(res.status==200){
       setArticles(res.data.payload)
       setError('')
     }
     else{
     setError(res.data.message);
     }
     }else{
      let res = await axios.get('https://sagelog.onrender.com/user-api/articles',{headers:{
        Authorization:`Bearer ${token}`
     }})
     console.log('articles')
     if(res.status==200){
       setArticles(res.data.payload)
       setError('')
     }
     else{
     setError(res.data.message);
     }
     }
    
    
  }
 
  //got to specific articles
  function gotoAricleById(articleObj){
    console.log(articleObj);
  navigate(`../${articleObj.articleId}`,{state:articleObj})
  }
  useEffect(()=>{
    getArticles();
  },[])
 if(!articles){
  navigate('/');
 }

  console.log(articles)
  return (
    <div className='container'>
    <div>
      {error.length!==0&&<p className='display-4 text-center mt-5 text-danger'>{error}</p>}
      <div>
        <div className="row">
          <div className="col"> <input type="text" onChange={(e)=>setSearch(e.target.value.toLowerCase())}className='form-control mb-3 ' placeholder="Search your articles here" /></div>
          <div className="col"> 
         
                <select
                   id="category"
                  className="form-select"
                 defaultValue=""
                    onChange={(e) => setGenre(e.target.value.toLowerCase())}
                  >
                      <option value="" disabled>
                          Select article type
                      </option>
                      <option value="">All articles</option>
                     <option value="programming">Programming</option>
                      <option value="AI&ML">AI&ML</option>
                        <option value="database">Database</option>
</select>

            
                
          </div>
        </div>
       
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 ">
        {
          articles.filter((articleObj)=>{
            if (genre !== "") {
              return (
               
                articleObj.category.toLowerCase() === genre &&
                (search.toLowerCase() === "" ||
                  articleObj.title.toLowerCase().includes(search))
              );
            }      
            
            
            return search.toLowerCase()===''?articleObj:articleObj.title.toLowerCase().includes(search)}).map((articleObj)=> 
            <div className="col mb-3" key={articleObj.articleId}>
              <div className="card  h-100">
                <div className="card-body ">
                  <div className="author-details text-end">
                    <img src={articleObj.authorData.profileimageURL} alt="" width="40px" className="rounded-circle" />
                    <p>
                      <small className='text-secondary'>
                        {articleObj.authorData.nameofauthor}
                      </small>
                    </p>
                  </div>
                  <h5 className="card-title">{articleObj.title}</h5>
                  <p className="card-text">{articleObj.content.substring(0,80)+"...."}</p>
                  <button className="custom-btn btn-4 btn btn-secondary" onClick={()=>gotoAricleById(articleObj)}>Read more</button>
                </div>
                <div className="card-footer ">
                  <small className="text-body-secondary">
                    Last updated on {articleObj.dateofModification}
                  </small>
                </div>

              </div>
            </div>
          )
        }
      </div>
    </div>
    </div>
  )
}

export default Articles
