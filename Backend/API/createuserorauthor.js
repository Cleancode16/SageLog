
const {Userauthor}=require('../models/userauthormodel')


async function createuserorauthor(req,res){

  // const {role,firstName,lastName,email,profileURL,isActive}=req.body;
  const newuserAuthor=req.body;
   const userdetails=await Userauthor.findOne({
    email:newuserAuthor.email
   });
   if(userdetails){
     ///check with the roles
     if(newuserAuthor.role===userdetails.role){
      res.status(200).json({
       message:newuserAuthor.role,
       payload:userdetails
      })
     }else{
      res.status(200).json({
        message:"invalid role"
      })
     }
   }else{
    let newUser=new Userauthor(newuserAuthor);
    let newUserOrauthorDoc=await newUser.save();
    res.status(201).json({
      message:newUserOrauthorDoc.role,payload:newUserOrauthorDoc
    })
   }
}
module.exports={
  createuserorauthor:createuserorauthor
}