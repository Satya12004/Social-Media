import React, { useEffect } from 'react'
import SidebarCom from '../Components/SidebarCom'
import axios from 'axios'
import { useState } from 'react'
import Posts from '../Components/Posts'
import { useSelector } from 'react-redux'



const Home = () => {
  const [post, setpost] = useState([]);
  console.log(post)
   let userSlice=useSelector((state)=>state.user)
   console.log(userSlice)
  
  let getAllPost=async()=>{
    let res=await axios.get('https://social-media-66lv.onrender.com/post/alluserPosts',{
      headers:{
        'Authorization':userSlice.token
      }
      
    })
    console.log(res)
    let data=res.data
    console.log(data.posts)
    setpost(data.posts)
  }
  useEffect(()=>{
    getAllPost()
  },[])
  
  return (
    <div className='flex h-[80vh]'>
    <div className='fixed top-[65px] left-0 w-[240px] h-[calc(100vh-65px)] bg-white'>
      <SidebarCom getAllyourPost={getAllPost}/>
   </div>
    <div className='ml-[240px] flex-1 overflow-y-auto  bg-amber-300' style={{height:'calc(115vh - 65px)'}}>
   
    <div className='max-w-1/2 m-auto  flex flex-col gap-2 mt-20'>

         {
                post.map((ele,i)=>{
            return <Posts ele={ele} getAllPost={getAllPost}/>
          })
         }
        </div>
       

    </div>
    </div>
  )
}

export default Home
