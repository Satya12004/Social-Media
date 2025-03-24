const express=require('express')
const checkToken = require('../middleware/Checktoken')
const { Chat, getFriendChat } = require('../Controller/ChatController')
const router=express.Router()

router.post('/create/:friendId',checkToken,Chat)
router.get('/getChat/:friendId',checkToken,getFriendChat)

module.exports=router