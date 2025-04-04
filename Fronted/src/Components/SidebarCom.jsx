import React, {useRef, useState} from 'react'
import {Modal} from 'antd'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const SidebarCom = (props) => {
   console.log(props)
  let useSlice=useSelector((state)=>state.user)
  console.log(useSlice)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uloadedFiles, setuloadedFiles] = useState('');
    const [LiveFile, setLiveFile] = useState('');

    let titleRef=useRef()
    let desCriptionRef=useRef()

    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const handleFileChanger =async (e)=>{
        let files = e.target.files;
        console.log(files)
        let filesArr =[...files];
     
       let imageArr=filesArr.map((ele)=>{
        let formdata=new FormData();
        
        formdata.append('upload_preset','Social Media')
        formdata.append('file',ele);
        let res= axios.post('https://api.cloudinary.com/v1_1/dmwue6moj/upload',formdata)
        return res
      })
      let ans=await Promise.all(imageArr)
      console.log(ans)

      let LiveArr=[]
      if(ans){
        ans.forEach(ele=> {
          LiveArr.push(ele.data.secure_url)
        });
      
      }
      setLiveFile(LiveArr)
        setuloadedFiles(filesArr)
    }
    
    const handleSubmit=async (e)=>{
      e.preventDefault()
      let obj={
        title:titleRef.current.value,
        desCription:desCriptionRef.current.value,  
      }
      if(LiveFile){
        obj.file=LiveFile
      }
      console.log(obj)
      try {
        let res=await axios.post('https://social-media-66lv.onrender.com/post/create',obj,{
          headers:{
            'Authorization':useSlice.token
          }
        })
        let data=res.data
        console.log(data)

        if(res.status==200){
          props.getAllyourPost()
          toast.success(data.msg,{position:"top-center"})
          titleRef.current.value='',
          desCriptionRef.current.value='',
          setuloadedFiles('')
          setIsModalOpen(false)
          setLiveFile('')
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className=''>
      <ul className='flex flex-col text-center lg:w-[230px] w-[85px] bg-gray-500'>
        <li className='lg:p-3 p-1 border-b text-black'><Link to={'/'}>Home</Link></li>
        <li onClick={showModal} className='p-3 border-b text-black'>Create Post</li>
        <li className='lg:p-3 p-1 border-b text-black'>Message</li>
        <li className='lg:p-3 p-1 border-b text-black'>Follower</li>
        <li className='lg:p-3 p-1 border-b text-black'>Following</li>
       
      </ul>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       

        <form action="" className='w-full h-full flex flex-col gap-3'>
              <label htmlFor="">Title</label>
                <input ref={titleRef} className='px-4 py-2 rounded-md border' type="text" placeholder='enter title'/>

                <label htmlFor="">Description</label>
                <textarea ref={desCriptionRef} className='px-4 py-2 rounded-md border' name="" id=""></textarea>

                <label  className='bg-green-700 rounded-md text-center w-max hover:bg-green-600 px-4 py-2 text-white' htmlFor="file">Upload</label>
                <input  onChange={handleFileChanger} id='file' multiple hidden type="file" />
<div className='flex justify-center items-start'>

  {uloadedFiles && <div className='grid grid-cols-3 gap-1 '> 

    {
                    uloadedFiles?.map((ele,i)=>{
                       return ele.type.includes('image')? <img className='w-[150px] h-[150px] m-auto' src={URL.createObjectURL(ele)} alt="" /> : <video className='w-[150px] h-[150px] m-auto ' controls src={URL.createObjectURL(ele)}></video>
                    })
                }
    </div>}
    

</div>
                <img className='w-[150px] h-[150px] m-auto' src="" alt="" />
               {/* <video src=""></video> */}
                <button onClick={handleSubmit} className='bg-blue-700 rounded-md hover:bg-blue-600 px-4 py-2 text-white'>Post</button>
              </form>
      </Modal>
    </div>
  )
}

export default SidebarCom
