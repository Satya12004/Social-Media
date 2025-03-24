const mongoose=require('mongoose')
const ChatSchema=new mongoose.Schema({
    
          userId:{
               type:mongoose.Schema.Types.ObjectId,
               required:true,
               ref:"user"
            },
            friendId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"user"
             },
             text:{type:String}
    
})
module.exports=mongoose.model('chat',ChatSchema)