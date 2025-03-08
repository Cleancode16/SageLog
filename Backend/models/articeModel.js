const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;
const authorSchema=new Schema({
  nameofauthor:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  profileimageURL:{
    type:String
  }
},{"strict":"throw"})
const usercommentSchema=new Schema({
  nameofuser:{
    type:String,
    required:true
  },
  comment:{
    type:String,
    required:true
  },
  isCommentActive:{
    type:Boolean,
    default:true
  } , commentId:{
    type:String,
    required:true
  }
 
})
const articleSchema=new Schema({
  authorData:authorSchema,
  articleId:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  dateofCreation:{
    type:String,required:true
  },
  dateofModification:{
    type:String,required:true
  },
  comments:[usercommentSchema],
   isArticleActive:{
    type:Boolean,
    default:true
  }

   
},{"strict":"throw"})
const Article=mongoose.model('Article',articleSchema);
module.exports={
  Article:Article
}