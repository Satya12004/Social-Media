import React from 'react'
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBydata } from '../Store/userSlice';
import axios from 'axios';

const ProfilePicUpdate = () => {
  
  let selector=useSelector((state)=>state.user)
  console.log(selector)

  let dispatch =useDispatch()
  const handleProfilePic= async(e)=>{
    let file=e.target.files[0];
    console.log(file)
    let formdata=new FormData()
    formdata.append('file',file);
    formdata.append('upload_preset','Social Media')
    let res=await axios.post('https://api.cloudinary.com/v1_1/dmwue6moj/upload',formdata)
    console.log(res)
    console.log(res.data.secure_url)
   
    let ref=await axios.put('http://localhost:8090/user/update',{profilePic:res.data.secure_url},{
   
      headers:{
        'authorization':selector.token
      }
    })
    console.log(ref)
    let data=ref.data
    console.log(data)
    if(ref.status==200){
      dispatch(fetchUserBydata(selector.token))
    }
}

  return (
  
  <div className='absolute bottom-[-75px] left-[5%] w-[175px] h-[175px] rounded-full border-amber-800 border-2'>
        <img src={selector.user?.profilePic} className='w-full h-full rounded-full object-cover' alt="" />
            <h3 className='text-center mt-3 text-xl text-white'>{selector.user?.name}</h3>
            <div className='updateProfile absolute bottom-4 right-0'>
                <label htmlFor="profile"><CiCamera size={35} color='yellow'/></label>
                <input onChange={handleProfilePic} type="file" hidden id='profile' />
            </div>
    </div>
  )
}

export default ProfilePicUpdate