import React, { useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Forgate = () => {
    let emailRef=useRef()
 
    let handleSubmit=async(e)=>{
      e.preventDefault()
    let obj={
     
     email:emailRef.current.value
   
    }
    try {
      let ref= await axios.post('https://social-media-66lv.onrender.com/user/forget',obj)
      let data =ref.data
    
      toast.success(data.msg,{position:'top-center'})
      document.write(data.msg)
    } catch (error) {
      console.error("Error sending request:", error);
    }
  
}
  return (
   
    
    <div>
          {/* <h1>{data.msg}</h1> */}
      <form action="">
     
     <h1 className='text-white-800 text-center'>This is a forget Page</h1>
     <div className='display flex gap-10 m-auto place-items-center justify-center align-center'>
        <h1 className='text-white'>Fill your Email</h1>
        <input ref={emailRef} className='border-white border-2' type="text" placeholder='enter your email'/>
        <button onClick={handleSubmit} className='bg-green-400'>Submit</button>
     </div>
      </form>
    </div>
  )
}

export default Forgate
