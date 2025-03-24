const mongoose = require("mongoose");

const converSationSchema =new mongoose.Schema({
members:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
],
messages:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    }
]
})
module.exports=mongoose.model('conversation',converSationSchema)