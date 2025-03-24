const { default: mongoose } = require("mongoose");
const PostColletion = require("../modules/PostColletion");

const CreatePost=async(req,res)=>{
const {title,  desCription,file}=req.body;
const {_id}=req.user
try {
    const post= await PostColletion.create( {
        title,
        desCription,
        file,
        userId:_id
        }) 
        res.status(200).json({msg:'users post created successfully'}) 
} catch (error) {
    res.status(500).json({msg:'user post creating in  error',error:error.message})
}

}

const updatePost=async(req,res)=>{
    
}

const DeletePost=async(req,res)=>{
    
}

const GetAllyourPost=async(req,res)=>{
  let {_id} =req.user;
  const posts=await PostColletion.find({userId:_id}).populate({path:'userId',select:'-password'}).sort({createdAt:-1}).populate({path:'Commets',populate:{path:'userId',select:'profilePic name'}});
  res.status(200).json({posts}) 
}

const allUsersPost=async(req,res)=>{
    const posts=await PostColletion.find().populate({path:'userId',select:'-password'}).sort({createdAt:-1}).populate({path:'Commets',populate:{path:'userId',select:'profilePic name'}});
    res.status(200).json({posts})  
}

const LikePost=async(req,res)=>{
  let {postId}=req.params;
  let{_id}=req.user
  try {
    const posts=await PostColletion.findById(postId)
    // console.log(posts)
    if(posts.likes.includes(_id)){
        posts.likes.pull(_id)
        await posts.save()
        res.status(200).json({msg:'posts dislike SuccessFully'}) 

    }
    else{
        posts.likes.push(_id)
        await posts.save()
        res.status(200).json({msg:'posts like SuccessFully'}) 
        
    }
  } catch (error) {
    res.status(500).json({error:error.message})
  }

}

  
let commentPost= async(req,res)=>{
  let {postId}=req.params;
  let{_id}=req.user
  let {text}=req.body
  const posts=await PostColletion.findById(postId)
  posts.Commets.push({userId:_id,text:text})
  await posts.save()
  res.status(200).json({msg:'comment added SuccessFully'}) 
}

const DeleteComment=async (req,res)=> {
  let {postId,commentId}=req.params;
  console.log(postId)
  console.log(commentId)
  try {
    let post = await PostColletion.findById(postId)
    let filterArr =  post.Commets.filter((comnt)=>comnt._id.toString()!==commentId)
    post.Commets = filterArr
    await post.save()
    res.status(200).json({msg:"comment deleted successfully"})
  } catch (error) {
    console.log(error)
  }

}

const getFriendPost=async(req,res)=>{
 
  try {
    const {FriendId}=req.params
    
    let FriendPost=await PostColletion.find({userId:FriendId}).populate({path:'userId',select:'-password'}).sort({createdAt:-1}).populate({path:'Commets',populate:{path:'userId',select:'profilePic name'}});
   
    res.status(200).json({FriendPost})
  } catch (error) {
    console.log({error:error.message})
  }
}


module.exports={
    CreatePost,
    updatePost,
    DeletePost,
    GetAllyourPost,
    allUsersPost,
    LikePost,
    commentPost,
    DeleteComment,
    getFriendPost
}