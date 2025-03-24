const mongoose=require('mongoose')
let UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is require'],
        trim:true,
        minLength:[3,'name should be greater than 3 character']
     },
     email:{
        type:String,
        required:[true, 'email is require'],
        unique:true,
        
     },
     password:{
        type:String,
        required:[true,'password is required'],
     
     },
     phone:{
        type:String,
       }
  
},{timestamps:true})
UserSchema.add({
   passwordResetToken:{
      type:String,
      default:null
   },
   profilePic:{
      type:String,
      default:"https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
  },
  coverPic:{
      type:String,
      default:"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
  },
  bio:{
      type:String
  },

  followers:[
       {
           type:mongoose.Schema.Types.ObjectId,
           required:true,
           ref:"user"
        }
  ],
  followings:[
   {
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:"user"
    }
]
 
  })
module.exports=mongoose.model('user',UserSchema)