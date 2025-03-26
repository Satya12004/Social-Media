import React, { useState } from 'react'
import ProfilePicUpdate from './ProfilePicUpdate';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUserBydata } from '../Store/UserSlice';
import { FaCamera } from "react-icons/fa"
import axios from 'axios';
import Loading from './Loading';

const CoverPic = () => {
     const [timming, setTimming] = useState(false);
     

       let selector=useSelector((state)=>state.user)
       console.log(selector)
        let dispatch =useDispatch()
       const handleCoverChanger = async(e)=>{
         setTimming(true)
           let file = e.target.files[0];
           console.log(file)
          //  setuploadedProfilePic(file)
           let formdata=new FormData()
          formdata.append('file',file);
          formdata.append('upload_preset','Social Media')
          let res=await axios.post('https://api.cloudinary.com/v1_1/dmwue6moj/upload',formdata)
          console.log(res)
          console.log(res.data.secure_url)

          let ref=await axios.put('https://social-media-66lv.onrender.com/user/update',{coverPic:res.data.secure_url},{
   
            headers:{
              'authorization':selector.token
            }
          })
          console.log(ref)
          let data=ref.data
          console.log(data)
          if(ref.status==200){
            setTimming(false)
             dispatch(fetchUserBydata(selector.token))
          }
    
       }
  return (
    <div className=' w-full m-auto h-[80vh] relative bg-green-500'>
    {timming===false  && <img className='w-full h-full object-cover mt-16' src={selector.user?.coverPic} alt="" />
}
  {
      timming===true && <div className=' w-full text-red-600'>
       <Loading/>
      </div>
  }  
<div className='updateCoverPic absolute bottom-0 right-5'>
        <label htmlFor="cover"><FaCamera size={35} color='white'/></label>
        <input onChange={handleCoverChanger} type="file" hidden id='cover' />
    </div>

<div className="profileBox">
  <ProfilePicUpdate/>    
</div>
    </div>
  )
}

export default CoverPic