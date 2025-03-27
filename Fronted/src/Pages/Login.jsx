import axios from 'axios'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../Store/UserSlice'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  let dispatch=useDispatch()
  
  let emailRef=useRef()
  let passwordRef=useRef()
  let navigate=useNavigate()
  const handleSubmit=async (e)=>{
   e.preventDefault
   let obj={
    
    email:emailRef.current.value,
    password:passwordRef.current.value
   }
   console.log(obj)
   let res=await axios.post('https://social-media-66lv.onrender.com/user/get',obj)
   console.log(res)
   if(res.status==200||res.status==201){
    localStorage.setItem('mediaApp',JSON.stringify({user:res.data.userdata,token:res.data.token,login:true}))
    dispatch(userLogin({user:res.data.userdata,token:res.data.token}))

    
    toast.success('user login successfully',{position:'top-center'})

    navigate('/')
   }
  }
  return (
    <div className=' '>
        
     <div className="fixed  p-4 flex  justify-center align-middle items-center font-[sans-serif]">
  <div className="w-full  max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
      <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000" />
      <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000" />
    </svg>
    <div className="my-8 text-center">
      <h4 className="text-3xl text-gray-800 font-extrabold">Sign In</h4>
      <p className="text-sm text-gray-500 mt-4">Create an account with us</p>
    </div>
    <form className="space-y-4">
   
      <div className="relative flex items-center">
        <input ref={emailRef} type="email" placeholder="Enter Email" className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 focus:border-blue-600 outline-none rounded-lg" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
          <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000" />
        </svg>
      </div>
      <div className="relative flex items-center">
        <input ref={passwordRef} type="password" placeholder="enter password" className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 focus:border-blue-600 outline-none rounded-lg" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
          <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000" />
        </svg>
      </div>
      <div className="flex">
        <input type="checkbox" className="w-4" />
        <label className="text-sm ml-4 text-gray-500">I have read and accept the <a href="javascript:void(0)" className="text-sm text-blue-600 hover:underline">Terms and Conditions</a></label>
      </div>
      <div className="!mt-8 space-y-4">
      <Link to='/forget' type="button" className="px-5 py-2.5 w-full bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg tracking-wide">forget Password</Link>
        <button onClick={handleSubmit} type="button" className="px-5 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg tracking-wide">log in</button>
        
      </div>
    </form>
 
  </div>
</div>

      
    </div>
  )
}

export default Login
