import { useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserBydata}  from './Store/userSlice'
import Forgate from './Pages/Forgate'
import {ToastContainer} from 'react-toastify'
import Profile from './Pages/Profile'
import FriendProfile from './Pages/FriendProfile'
import Chat from './Pages/Chat'

import { connectSocket, disconnectSocket } from './Store/SocketSlice'
// let url='http://localhost:8090'
// const socket=io(url,{transports:['websocket']});

function App() {
  // const [count, setCount] = useState(0)
  // socket.emit('msg','hello')
  // socket.on('recieve',(ans)=>{
  //   console.log(ans)
  // })
let selector=useSelector((state)=>state.user)
  console.log(selector)

  const socketSlice = useSelector((state)=>state.socket)
  console.log(socketSlice)

  let login=selector.login
  console.log(login)

  let token=selector.token
  console.log(token)
  
  let dispatch=useDispatch()
   useEffect(()=>{
  if(token){
  dispatch(fetchUserBydata(token))
  }
 },[token])

 useEffect(() => {
  if (selector?.user?._id) {
    dispatch(connectSocket(selector?.user?._id)); // Connect when user logs in
  }
  return()=>{
    if (socketSlice.isConnected) {
      dispatch(disconnectSocket()); 
    }
  }
}, [selector?.user?._id, dispatch]);

  return (
    <>
    <BrowserRouter>
    <div className='h-65vh mt-0'>
    <Navbar/>
    </div>
 
    <Routes>
      <Route path='/' element={login===true?<Home/>:<Navigate to={'/login'}/>}/>
      <Route path='/profile' element={login===true?<Profile/>:<Navigate to={'/login'}/>}/>
       <Route path='/login' element={login===false?<Login/>:<Navigate to={'/'}/>}/>
      <Route path='/signup' element={login===false?<SignUp/>:<Navigate to={'/'}/>}/>
      <Route path='/forget' element={login===false?<Forgate/>:<Navigate to={'/'}/>}/>
      <Route path='/friendProfile' element={login === true ? <FriendProfile /> : <Navigate to={'/login'} />} />
      <Route path='/chat' element={login === true ? <Chat /> : <Navigate to={'/login'} />} />
     </Routes>
     <ToastContainer/>
    </BrowserRouter>
    </>
  )
}

export default App
