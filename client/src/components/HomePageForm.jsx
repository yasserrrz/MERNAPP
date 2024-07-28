import React, { useState } from 'react'
import { Link } from "react-router-dom";
import NoProfileImg from "../assets/userprofile.png";
import CustomButton from "./CustomButton";
import {useSelector} from "react-redux";
import TextInput from './TextInput';
import {  BsFiletypeGif, BsImage } from 'react-icons/bs';
import { BiSolidVideo } from 'react-icons/bi';
import Loading from './Loading';
const HomePageForm = () => {
    const {user} = useSelector((state)=>state.user)
    const [posting , setPosting] = useState(false);
    const [post , setPost] = useState('');
    const [file , setFile] = useState(null);
    const [postError , setPostError] = useState(null);
    
    const handlePostSubmit = (event) => {
        event.preventDefault();
    
        setPostError('');
       
        if (!post.trim()) {
            setPostError("Please enter any value.");
          return;
        }
  
      };

  return (
    <div>
        <form className='bg-primary px-4 rounded-lg' onSubmit={handlePostSubmit}>
            <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645] ">
                <img src={user?.picture ? user.picture :  NoProfileImg } className='rounded-full w-14 h-14 object-cover' alt="user image" />
                <TextInput styles={"w-full rounded-full py-5 "}  onChangeFunc={(e) => setPost(e.target.value)} error={postError} placeholder={"What's on your mind....."}
                name="discription"/>
            </div>
            {postError?.message && (
              <span
                className={`${
                  postError?.status === "faild" ? "text-[#f65]" : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {postError?.message}
              </span>
            )}
            <div className="flex items-center justify-between py-4 ">
                <label htmlFor='imgUpload' className='flex items-center gap-1 text-base text-ascent2 hover:text-ascent1 cursor-pointer'>
                    <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}  className='hidden' id='imgUpload' data-max-size = "5120" accept='.jpg, .png, .jpeg'/>
                   <BsImage />
                   <span>Image</span>
                </label>
                <label htmlFor='VideoUpload' className='flex items-center gap-1 text-base text-ascent2 hover:text-ascent1 cursor-pointer'>
                    <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}  className='hidden' id='VideoUpload' data-max-size = "5120" accept='.mp4, .wav'/>
                   <BiSolidVideo />
                   <span>Video</span>
                </label>
                <label htmlFor='gifUpload' className='flex items-center gap-1 text-base text-ascent2 hover:text-ascent1 cursor-pointer'>
                    <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}  className='hidden' id='gifUpload' data-max-size = "5120" accept='.gif'/>
                   <BsFiletypeGif />
                   <span>Gif</span>
                </label>
                <div className="">
                    {posting? <Loading/> : <CustomButton type={"submit"} title={"Post"} containerStyles={"bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"} onSubmit={handlePostSubmit} />}
                </div>
            </div>
        </form>
    </div>
  )
}

export default HomePageForm