const jwt = require('jsonwebtoken')
const JWT_SECRET = 'mySecret@123'
const userCollection = require('../modules/UserModel')
//middleware --> middleware are functions that have the access of requesting to an object responding to an object. they can also modify the request and response. they can also be used in between the routes

async function checkToken(req,res, next){
    let token = req.cookies.token || req.headers.authorization;
   //  console.log(token)
    
 try {
    let decoded = await jwt.verify(token,JWT_SECRET);
   //  console.log(decoded._id)
    let user = await userCollection.findById(decoded._id);
    req.user = user
    next();
 } catch (error) {
    return res.status(401).json({message:"unauthorized",error:error.message})
 }
}

module.exports=checkToken