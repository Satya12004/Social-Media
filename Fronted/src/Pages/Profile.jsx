import React, { useState } from 'react'
import Posts from '../Components/Posts'
import CoverPic from '../Components/CoverPic'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'

const Profile = () => {

  const [post, setpost] = useState([]);
  console.log(post)
   let userSlice=useSelector((state)=>state.user)
   console.log(userSlice)
  
  let getAllyourPost=async()=>{
    let res=await axios.get('https://social-media-66lv.onrender.com/post/yourpost',{
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
    getAllyourPost()
  },[])
  

  return (
    <div>
        
    
      <div  className="topPart w-[90%] m-auto h-[45vh] relative bg-green-500 text-white">
        <CoverPic/>
         </div>
      <div className="mid mb-5 w-[50%] m-auto text-center mt-15">
        <div className='flex justify-center gap-7 mt-80 lg:mt-55 text-white text-center'>
        <span>
            <b>Posts</b>
            <p>{post.length}</p>
        </span>
        <span>
            <b>Followers</b>
            <p>{userSlice?.user?.followers?.length}</p>
        </span>
        <span>
            <b>Followings</b>
            <p>{userSlice?.user?.followings?.length}</p>
        </span>
        </div>
    
      </div>

      <div className='bottomBox w-max flex flex-col gap-2 m-auto mt-10 justify-center align-middle'>
      <div className='m-auto  flex flex-col gap-2'>
                   {post.map((ele,i)=>{
                     return <Posts ele={ele}/>
                   })}
                 </div>
      </div>
    </div>
  )
} 

export default Profile