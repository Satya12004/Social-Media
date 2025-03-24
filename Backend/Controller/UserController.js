const userCollection=require('../modules/UserModel')
const bcrypt=require('bcryptjs')
const salt=bcrypt.genSaltSync(10)
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mySecret@123'
var randomstring = require("randomstring");
const nodemailer = require("nodemailer");

const register=async (req,res)=>{
    const {name,email,phone,password}=req.body
    try {
        let hashedpassword=bcrypt.hashSync(password,salt);
        let data=await userCollection.create({
            name,
            email,
            phone,
            password:hashedpassword
        })
        res.status(200).json({msg:'user register successfully'})
    } catch (error) {
        res.status(500).json({msg:'user register error',error:error.message})
    }
   
}
const login=async(req,res)=>{
    const{email,password}=req.body
   try {
    let userdata=await userCollection.findOne({email})
    if(userdata){
     let comparePassword=bcrypt.compareSync(password,userdata.password)
     if(comparePassword){
       
         // let token = jwt.sign({}, secretKey)
         let token = jwt.sign({_id:userdata._id}, JWT_SECRET)
         res.cookie('token',token)
         res.status(200).json({ msg: "user log in successfully", token })
     
     }
     else{
        res.status(404).json({msg:'error credentials!!'})
     }
    }
    else{
        res.status(404).json({msg:'user not found pls signup first!!'})
    }
   } catch (error) {
    res.status(500).json({msg:'error in login user',error:error.message})
   }
}
const update=async (req,res)=>{
    const {name,password,phone,profilePic,coverPic}=req.body
    const id=req.user._id
    // console.log(id)
    try {
        if(password){
            var hashedpassword=bcrypt.hashSync(password,salt);
        }
        let userdata=await userCollection.findByIdAndUpdate(id,{name,password:hashedpassword,phone,profilePic,coverPic},{new:true})
        res.status(200).json({msg:`${userdata} data update successfully`})
    } catch (error) {
        res.status(500).json({msg:'error in updating user',error:error.message})
    }
}
const userdelete=async (req,res)=>{

     
        // console.log(req.user)
    
        try {
            let data = await userCollection.findByIdAndDelete(req.user)
            res.status(200).json({msg:"user deleted successfully"})
        
        } catch (error) {
            res.status(500).json({msg:"error in deleting user",error:error.message})
        
}
}

const forgetPassword= async(req,res)=>{
    const {email}=req.body
    let user=await userCollection.findOne({email})

    if(user){
        let resetToken=randomstring.generate(25)
        user.passwordResetToken=resetToken;
        await user.save()
       
        

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "Satyamktiwari4754@gmail.com",
    pass: "hhzs laie aezt dpan",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'satyamktiwari4754@gmail.com', // sender address
    to:email, // list of receivers
    subject: "Password reset request", // Subject line
    text: `please click the link /n http://localhost:8090/user/passwordToken/${resetToken}`, // plain text body
  
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
main().catch(console.error);
res.json({msg:'pleses check the email'})
    }
    else{
     return res.status(404).json({msg:'user not found'})
    }
}

const resetpassword=async(req,res)=>{
    const {token}=req.params
    const {password}=req.body
    let user =await userCollection.findOne({passwordResetToken:token})
    user.passwordResetToken=null;
    let hashedPassword = bcrypt.hashSync(password,salt);
    user.password = hashedPassword
    await user.save()
    res.status(200).json({msg:'password updated successfully'})
    
}

const getLoggedInuser=async(req,res)=>{
    // console.log(req.user)
    res.status(200).json(req.user)
}

const SearchUser= async(req,res)=>{
  let {name}=req.query;
  try {
    if(name===''){
        return res.json({users:[]})
    }
      let users= await userCollection.find({name:new RegExp(name)})
      res.status(200).json({users})
  } catch (error) {
   console.log(error) 
  }
 
 }
const getFriend= async(req,res)=>{
    let id=req.query.id
    // console.log(id)
    try {
        let friend =await userCollection.findById(id)
        res.status(200).json({friend})
    } catch (error) {
        console.log(error)
    }
    }
const Followuser=async(req,res)=>{
        let {_id}=req.user;
        // console.log(_id)
        let {friendId}=req.params;
        // console.log(friendId)
        try {
            let user=await userCollection.findById(_id)
            let friend=await userCollection.findById(friendId)
            if(!user.followings.includes(friend._id)){
                user.followings.push(friend._id)
                friend.followers.push(user._id)
                await user.save()
                await friend.save()
                res.status(200).json({msg:'follow successfully',user,friend})

    }else{
        user.followings.pull(friend._id)
        friend.followers.pull(user._id)
        await user.save()
        await friend.save()
        res.status(200).json({msg:'unfollow successfully'}) 
    }
        } catch (error) {
            res.status(500).json({error:error.message})
        }
     }
module.exports={
    register,
    login,
    update,
    userdelete,
    forgetPassword,
    resetpassword,
    getLoggedInuser,
    SearchUser,
    getFriend,
    Followuser
}