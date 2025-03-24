/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { MdDelete } from "react-icons/md";
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useSelector} from 'react-redux'
import { formatDistanceToNow } from 'date-fns'; 
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import SliderValueLabel from '@mui/material/Slider/SliderValueLabel';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Posts(props) {
    console.log(props)
 let navigate=useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [seletcedPost, setseletcedPost] = useState('');
    
    const showModal = (obj) => {
        setseletcedPost(obj)
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handleClick = ()=>{
        console.log("ok")
        if(props?.ele?.userId?._id===userId){
            navigate('/profile')
        }
        else{

            navigate('/friendProfile', {state:props?.ele?.userId?._id})
        }
      }
    
    let userSlice = useSelector((state)=>state.user)
    let userId = userSlice.user?._id
    console.log(userId)
  
    let CommentRef=useRef()
    const handleComment= async(post)=>{
        console.log(post)
        let text=CommentRef.current.value
        console.log(text)
        let res = await axios.post(`http://localhost:8090/post/comment/${post._id}`,{text},{
            headers:{
                'Authorization':userSlice.token
            }
        })
        let data = res.data
        props.getAllPost()
        console.log(data)
        CommentRef.current.value=''
        toast.success(data.msg,{position:'top-center'})
    }
    const handleCommentDelete = async(obj)=>{
        console.log(obj)
        console.log(props.ele)
        let res = await axios.delete(`http://localhost:8090/post/deleteComment/${props.ele._id}/${obj._id}`)
        let data = res.data;
        console.log(data)
        toast.success(data.msg,{position:'top-center'})
        props.getAllPost()
    }

const handleLike = async(obj)=>{
    console.log(obj)
    let res = await axios.get(`http://localhost:8090/post/likeduser/${obj._id}`,{
        headers:{
            'Authorization':userSlice.token
        }
    })
    let data = res.data
    props.getAllPost()
    console.log(data)
    toast.success(data.msg,{position:'top-center'})
}
  
   const settings={
    dots: true,
    speed:500,
    infinite: false,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
   }
    return (
    <div>
          <Card
            variant="outlined"
            sx={{ minWidth: 300, '--Card-radius': (theme) => theme.vars.radius.xs }}
        >
            <CardContent onClick={handleClick} orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                <Box
                    sx={{
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            m: '-2px',
                            borderRadius: '50%',
                            background:
                                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                        },
                    }}
                >
                    <Avatar
                        size="md"
                        src={props.ele.userId.profilePic}
                        sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
                    />
                </Box>
                <Typography sx={{ fontWeight: 'lg' }}>{props.ele.userId.name}</Typography>
                <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                    <MoreHoriz />
                </IconButton>
            </CardContent>
            {
                !props.ele.file.length &&  <div className='min-h-[150px] '>
                    <div className='flex min-h-[150px]  justify-center items-center'>
                    <p className='text-center'>{props.ele.title}</p>
                    </div>
               
                </div>
            }
            <CardOverflow>

            <Slider {...settings} className='h-[250px] relative flex'>
                {
                    props.ele.file.map((url,index)=>{
                       return url.includes('image')?<div key={index}> <img className='object-contain h-[250px] w-full' src={url} alt={`Slide ${index+1}`} /></div>:<div key={index}><video controls className='w-full h-[250px]' src={url}></video></div>
                    })
                }
            </Slider>
                {/* <AspectRatio>
                    <img className='object-center h-full w-full' src={props.ele.file[0]} alt="" loading="lazy" />
                </AspectRatio> */}
            </CardOverflow>
            <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
                <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                {!props.ele.likes.includes(userId) && <IconButton onClick={()=>handleLike(props.ele)} variant="plain" color="neutral" size="sm">
                        <FavoriteBorder />       
                    </IconButton>}
                {props.ele.likes.includes(userId) &&  <IconButton  onClick={()=>handleLike(props.ele)}   color="danger" size="sm">
                        <FaHeart size={22}/>       
                    </IconButton>}
                    <FaHeart color='red' size={30}/>
                    <IconButton variant="plain" color="neutral" size="sm">
                    <ModeCommentOutlined onClick={()=>showModal(props.ele)}/>
                    <sup className='-mt-3 text-sm text-red-600'>{props.ele.Commets.length}</sup>
                    </IconButton>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <SendOutlined />
                    </IconButton>
                </Box>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
                    {[...Array(5)].map((_, index) => (
                        <Box
                            key={index}
                            sx={[
                                {
                                    borderRadius: '50%',
                                    width: `max(${6 - index}px, 3px)`,
                                    height: `max(${6 - index}px, 3px)`,
                                },
                                index === 0
                                    ? { bgcolor: 'primary.solidBg' }
                                    : { bgcolor: 'background.level3' },
                            ]}
                        />
                    ))}
                </Box> */}
                <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
                    {/* <IconButton variant="plain" color="neutral" size="sm">
                        <BookmarkBorderRoundedIcon />
                    </IconButton> */}
                </Box>
            </CardContent>
            <CardContent>
                <Link
                    component="button"
                    underline="none"
                    textColor="text.primary"
                    sx={{ fontSize: 'sm', fontWeight: 'lg' }}
                >
                    {props.ele.likes.length}likes
                </Link>
               {props.ele.file.length>0 &&<Typography sx={{ fontSize: 'sm' }}>
                    <Link
                        component="button"
                        color="neutral"
                        textColor="text.primary"
                        sx={{ fontWeight: 'lg' }}
                    >
                        {props.ele.title}
                    </Link>{' '}
                    
                </Typography>}
                <Link
                    component="button"
                    underline="none"
                    startDecorator="…"
                    sx={{ fontSize: 'sm', color: 'text.tertiary' }}
                >
                    more
                </Link>
                <Link
                    component="button"
                    underline="none"
                    sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
                >
                    {
                    props.ele?.createdAt && formatDistanceToNow(new Date(props.ele.createdAt), { addSuffix: true })
}
                </Link>
            </CardContent>
            <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                    <Face />
                </IconButton>
                <input ref={CommentRef} className='w-full border-2'
                    variant="plain"
                    size="sm"
                    placeholder="Add a comment…"
                    sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
                />
                <button onClick={()=>handleComment(props.ele)} className='cursor-pointer bg-green-500 px-2 py-1 rounded-md text-white' type='button' role="button">
                    Post
                </button>
            </CardContent>
        </Card>
        <Modal title="Comments" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       {
       props.ele.Commets.length>0? <div>
             { props?.ele?.Commets.map((ele)=>{
                return <div className='mb-5 flex justify-between'>
                    <div className='flex gap-3 '>
                        <img src={ele?.userId?.profilePic} className='w-[40px] h-[40px] rounded-full' alt="" />
                        <div>
                        <p className='font-semibold'>{ele?.userId?.name}</p>
                        <p>{ele.text}</p>
                        </div>
                    </div>
                   {userId===ele.userId._id && <MdDelete onClick={()=>handleCommentDelete(ele)}  size={20} color='red'/>}
                </div>
            })
            
        }
        </div>:<h1>No Comments yet</h1>
       }
       
      </Modal>
    </div>
      
    );
}
