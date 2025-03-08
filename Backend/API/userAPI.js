const exp=require('express');
const userApp=exp.Router();
const {Userauthor}=require('../models/userauthormodel');
const {createuserorauthor}=require('../API/createuserorauthor');
const expressasynchandler=require('express-async-handler');
const {Article}=require('../models/articeModel')
const {requireAuth}=require('@clerk/express')
require('dotenv').config()

//API
userApp.get('/articles',requireAuth({signInUrl:'unauthorized'}),expressasynchandler(async(req,res)=>{
  console.log('reached');
  const listOfArticles=await Article.find({isArticleActive:true});
  res.status(200).json({
    message:"articles",
    payload:listOfArticles
  })
}))
userApp.post('/user',expressasynchandler(createuserorauthor))
//add comment
userApp.put('/comment/:articleId',expressasynchandler(async(req,res)=>{
  console.log('user commented');
 const commentObj=req.body;
 console.log(commentObj,'is');
  const articleId=req.params.articleId;
  const articlewithcomments=await Article.findOneAndUpdate(
    {articleId:articleId},
    {
    $push:{comments:commentObj}
  },
  {returnOriginal:false})
  console.log(articlewithcomments);
  res.status(200).json({
    
   message:"comment added",payload:articlewithcomments
  })
}))

module.exports={
  userApp:userApp
}