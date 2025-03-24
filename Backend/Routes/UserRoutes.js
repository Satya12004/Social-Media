const userCollection=require('../modules/UserModel')
const express= require('express')
const { register, login, update, userdelete, forgetPassword,resetpassword, getLoggedInuser, SearchUser, getFriend, Followuser } = require('../Controller/UserController')
const  checkToken=require('../middleware/Checktoken')
const router=express.Router()
router.post('/create',register)
router.post('/get',login)
router.put('/update',checkToken,update)
router.delete('/delete',checkToken,userdelete)
router.post('/forget',forgetPassword)

router.get('/passwordToken/:token',async(req,res)=>{
    let token=req.params.token
    let user=await userCollection.findOne({passwordResetToken:token})
    if(user){
        res.render('newpassword',{token})
    }else{
        res.send({msg:"token has expired"})
    }
})

router.post('/passwordToken/:token',resetpassword)
router.get('/loggedInUser',checkToken,getLoggedInuser)
router.get('/SerchUser',SearchUser)
router.get('/getfriend',getFriend)
router.put('/followuser/:friendId',checkToken,Followuser)

module.exports=router