const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;
 const userAuthorSchema =new Schema({
role:{
  type:String,
  required:true
},
firstName:{
  type:String,
  required:true
}
,
lastName:{
  type:String
},
email:{
  type:String,
  required:true,unique:true
},
profileimageURL:{
  type:String
},
isActive:{
  type:Boolean,
  default:true
}
 },{"strict":"throw"})
 const Userauthor=mongoose.model('Userauthor',userAuthorSchema);
 module.exports={
  Userauthor:Userauthor
 }