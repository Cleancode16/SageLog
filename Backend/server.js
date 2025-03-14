require('dotenv').config();
const express=require('express');
const { default: mongoose } = require('mongoose');
const cors=require('cors')
const app=express();

//body parser middleware
app.use(cors({
  origin: ["https://deploy-mern-lwhq.vercel.app"],
methods: ["POST", "GET"],
credentials: true
}

));
app.use(express.json())
const port=process.env.port||4000;
mongoose.connect(process.env.DBURL).then(()=>app.listen(port,()=>
  console.log("server listening at the "+port))).catch(e=>
  console.log('the db is not connected '+e))
  const {userApp}=require('../Backend/API/userAPI')
  const {authorApp}=require('../Backend/API/authorApi')
  const {adminApp}=require('../Backend/API/adminAPI')
app.use('/user-api',userApp);
app.use('/admin-api',adminApp);
app.use('/author-api',authorApp);

app.use((err,req,res,next)=>{
  console.log('err object in express error handler:',err);
  res.send({message:err.message});
})

