const exp=require('express');
const authorApp=exp.Router();
const expressasynchandler=require('express-async-handler');
const {createuserorauthor}=require('../API/createuserorauthor')
const {Article}=require('../models/articeModel')
require('dotenv').config()
const {requireAuth}=require('@clerk/express')


// authorApp.use(clerkMiddleware());
//API
authorApp.post('/author',expressasynchandler(createuserorauthor))
authorApp.post('/article',expressasynchandler(async (req,res)=>{
//get new article obj from req
 const newArticleObj=req.body;
  const newArticle=new Article(newArticleObj);
  const articleObj=await newArticle.save();
  res.status(201).send({
    message:"article published",payload:articleObj
  })
}))

authorApp.get('/articles',requireAuth({signInUrl:'unauthorized'}),expressasynchandler(async(req,res)=>{
  console.log('reached');
  const listOfArticles=await Article.find();
  res.status(200).json({
    message:"articles",
    payload:listOfArticles
  })
}))

authorApp.get('/unauthorized',(req,res)=>{
  console.log('unauthorized')
  res.send({message:"unauthorized request"})
})

//modifyinfg the article using articleId
authorApp.put('/article/:articleId',requireAuth({signInUrl:'unauthorized'}),expressasynchandler(async(req,res)=>{
  // const articleId=req.params.articleId;
  const modifiedArticle=req.body;
  
  const dbRes=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
  res.status(200).json({
    message:"articles in the db",
    payload:dbRes
  })
  }))
//soft delete of an article 
authorApp.put('/article/update/:articleId',expressasynchandler(async(req,res)=>{
  const modifiedArticle=req.body;
  const dbRes=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
  res.status(200).json({
    message:"articles deleted",
    payload:dbRes
  })
}))

module.exports={
 authorApp:authorApp
}