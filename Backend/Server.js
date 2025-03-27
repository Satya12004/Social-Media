const express=require('express')
const app=express();
const server = require('http').createServer(app);
const port=8090;
const cors =require('cors')
const http = require('http');
 const { Server } = require('socket.io');
 require('dotenv').config()

const connectTodb = require('./Config/db');
const cookieParser = require('cookie-parser')
connectTodb()

const UserRouter=require('./Routes/UserRoutes');
const PostRouter = require('./Routes/PostRoutes');
const ChatRouter =require('./Routes/ChatRoutes')
app.use(cors({
  origin: ['http://localhost:3000',"https://social-media-theta-ochre.vercel.app"] ,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true                 // Allow credentials (cookies, headers)
}))
// const io = require('socket.io')(server);

 const io = require('socket.io')(server);

app.use(express.json())
app.use(cookieParser())
const users = new Map();

function deleteByValue(value) {
  for (let [key, val] of users) {
      if (val === value) {
          users.delete(key);

          return users // Stop after deleting the first occurrence
      }
  }
}
 
io.on('connection', socket => {
  console.log('connection is established', socket.id)
  socket.on('newUser', (id) => {
      console.log(id)
      users.set(id,socket.id);
      console.log(users)
  })
  socket.on('sendMessage',({userId,friendId,text})=>{
      console.log(userId)
      console.log("friendId",friendId)
      let friendSocketId = users.get(friendId)
      console.log("friendSocketId", friendSocketId)
      if(friendSocketId){
          socket.to(friendSocketId).emit('recievedMsg',{userId,friendId,text})
      }
      console.log(text)
  })
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    let updatedUsers = deleteByValue(socket.id);
    console.log(updatedUsers)
});

});

  


app.set('view engine','ejs')

app.get('/',(req,res)=>{
  res.json('welcome page---')
  
})


app.use('/user',UserRouter)
app.use('/post',PostRouter)
app.use('/Chat',ChatRouter)

// io.on('connection', socket => {
// console.log('connection is establish',socket.id);
// socket.on('msg',(ans)=>{
//   console.log(ans)
//   socket.emit('recieve','message recieved succesfully')
// })

// });

server.listen(port,()=>{
console.log(`server is running on`)
})
