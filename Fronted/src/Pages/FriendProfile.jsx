import React, { useEffect, useState } from 'react'
import Posts from '../Components/Posts';
 import CoverPic from '../Components/CoverPic';
 import { useDispatch, useSelector } from 'react-redux';
 import axios from 'axios';
 import { useLocation } from 'react-router-dom';
 import queryString from 'querystring';
import { toast } from 'react-toastify';
import { updateUser } from '../Store/UserSlice';
import { Link } from 'react-router-dom';
 
 const FriendProfile = () => {
 
let dispatch =useDispatch()
  const [Friends, setFriends] = useState([]);
  console.log(Friends)
   let location = useLocation();
   console.log(location.state)
  let friendId =location.state

   let userSlice = useSelector((state) => state.user);
   console.log(userSlice)
   
   let getFriends = async () => {
    try {
      let res = await axios.get(`https://social-media-66lv.onrender.com/user/getfriend?id=${location.state}`,
        // {
        //   headers: {
        //     Authorization: userSlice.token,
        //   },
        // }
      );
      console.log(res.data);
      setFriends([res.data.friend])
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };
  useEffect(()=>{
    getFriends();
  },[location.state])
 
  const [FriendsPost, setFriendsPost] = useState([]);
  console.log(FriendsPost)

 let getFriendsPost = async () => {
    try {
      let res = await axios.get(`https://social-media-66lv.onrender.com/post/friendpost/${location.state}`,
        {
          headers: {
            'Authorization': userSlice.token,
          },
        }
      );
      console.log(res);
      setFriendsPost(res.data.FriendPost)
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };
  useEffect(()=>{
    getFriendsPost();
  },[location.state])

  const handleFollow = async()=>{
    let res = await axios.put(`https://social-media-66lv.onrender.com/user/followuser/${location.state}`,{},{
      headers:{
        'Authorization': userSlice.token
      }
    })
    let data = res.data;
    console.log(data)
    toast.success(data.msg,{position:"bottom-right"})
    setFriends([data.friend])
    dispatch(updateUser(data.user))
  }
   return (
     <div>
         
     {Friends.map((friend)=>(
       <div  className="topPart w-[90%] m-auto h-[45vh] relative bg-green-500">
       <div className=' w-full m-auto h-[45vh] relative bg-green-500'>
      <img className='w-full h-full object-cover' src={friend?.coverPic} alt="" />
  <div className="profileBox">
    <div className=' absolute bottom-[-75px] left-[5%] w-[175px] h-[175px] rounded-full border-amber-800 border-2'>
          <img src={friend?.profilePic} className='w-full h-full object-center rounded-full object-cover' alt="" />
          <h3 className='text-center mt-3 text-xl text-white'>{friend?.name}</h3> 
       </div> 
</div>
     </div>
       </div>
     ))
     }
     
       <div className="mid mb-5 w-[90%] m-auto text-center relative mt-5 text-white">
         <div className='flex justify-center gap-7 '>
         <span>
             <b>Posts</b>
             <p>{FriendsPost.length}</p>
         </span>
         <span>
             <b>Followers</b>
             <p>{Friends[0]?.followers?.length}</p>
         </span>
         <span>
             <b>Followings</b>
             <p>{Friends[0]?.followings?.length}</p>
         </span>
         </div>
        <div className='flex gap-2 absolute right-0'>
        <Link state={{friend:{id:Friends[0]?._id, profilePic:Friends[0]?.profilePic,name:Friends[0]?.name}}} className='bg-blue-700 px-3 py-2 rounded-md hover:bg-blue-800 text-white' to={'/chat'}>Chat</Link>
        {
             Friends[0]?.followers?.includes(userSlice?.user?._id) ?
               <button onClick={handleFollow} className='bg-green-700 px-3 py-2 rounded-md hover:bg-green-800 text-white'>Unfollow</button>
               :
               <button onClick={handleFollow} className='bg-green-700 px-3 py-2 rounded-md hover:bg-green-800 text-white'>Follow</button>
           }
        </div>
       </div>
 
      
       <div className='max-w-1/4 m-auto  flex flex-col gap-2'>
                    {FriendsPost.map((ele,i)=>{
                      return <Posts ele={ele}/>
                    })}
                  </div>
     </div>
   )
 }
 
 export default FriendProfile