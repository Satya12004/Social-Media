const { CreatePost, DeletePost, allUsersPost, GetAllyourPost, LikePost,commentPost, DeleteComment, getFriendPost } = require('../Controller/postController');
const { update } = require('../Controller/UserController');
const checkToken = require('../middleware/Checktoken');
const PostCollection=require('../modules/PostColletion')
const express =require('express')
const PostRouter=express.Router();

PostRouter.post('/create',checkToken,CreatePost)
PostRouter.put('/update/:postId',checkToken,update)
PostRouter.post('/delete/:postId',checkToken,DeletePost)
PostRouter.get('/yourpost',checkToken,GetAllyourPost)
PostRouter.get('/alluserPosts',checkToken,allUsersPost)
PostRouter.get('/likeduser/:postId' ,checkToken,LikePost)
PostRouter.post('/comment/:postId',checkToken,commentPost)
PostRouter.delete('/deleteComment/:postId/:commentId',DeleteComment)
PostRouter.get('/friendpost/:FriendId',checkToken,getFriendPost)


module.exports=PostRouter