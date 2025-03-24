const ChatCollection=require('../modules/ChatCollection')
const ConverSation = require('../modules/ConverSation')

const Chat=async(req,res)=>{
    let {friendId}=req.params
    let {text,file}=req.body
    let {_id}=req.user
    try {
        let Chat=await ChatCollection.create({
        friendId,
        text,
        file,
        userId:_id
        })
        let conversation=await ConverSation.findOne({members:{$all:[friendId,_id]}})
        if(!conversation){
            conversation=await ConverSation.create({members:[friendId,_id]})
        }
        conversation.messages.push(Chat._id)
        await conversation.save()
        res.status(200).json({msg:'send Chat successfully'}) 
    } catch (error) {
        res.status(500).json({msg:'chat sending in  error',error:error.message})
    }
}

const getFriendChat=async(req,res)=>{
    let {friendId}=req.params;
    let {_id}=req.user
   try {
    let chat=await ConverSation.find({members:{$all:[friendId,_id]}}).populate('messages')
    res.status(200).json(chat)
   } catch (error) {
    res.status(500).json({error:error.message})
   }
}
module.exports={
    Chat,
    getFriendChat
}