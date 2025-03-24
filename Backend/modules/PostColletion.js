const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    title:{
        type:String,
      
     },
     desCription:{
        type:String,
       
     },
     file:[{url:String,type:String}],
     userId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"user"
     
     },
     likes:[ 
        {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
     
     }
   ],

     Commets:[ 
        {
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
     },
     text:{type:String},

     Reply:[
        {userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
         },
         text:{type:String},
     }
   ],
     CommentLike:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
         },
     }]
     }],
},{timestamps:true})
module.exports=mongoose.model('posts',PostSchema);