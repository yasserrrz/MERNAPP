import {useSelector ,useDispatch } from 'react-redux'
import { TbSocial } from "react-icons/tb";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import { useState } from 'react';
import CustomButton from './CustomButton';
import {BsMoon, BsSunFill} from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io';
import { setTheme } from '../redux/theme';
import { setLogout } from '../redux/userSlice';
const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const [ searchInput , setSearchInput ] = useState('')
  const dispatch = useDispatch();
  const handelTheme = ()=>{
    dispatch(setTheme())
    console.log(theme)
  }
  const handelSubmit = (param , e) => {
    e.preventDefault()
  };
  const handelLOgout = ()=>{
    dispatch(setLogout())
    console.log(user.token)
  }
  const handelSearch = () => {};
  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
      <Link to={"/"} className="flex gap-2 items-center">
      <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial />
            </div>
            <span className="text-2xl text-[#065ad8] font-semibold">
              ShareFuns
            </span>
      </Link>
       <form className="hidden md:flex items-center justify-center" onSubmit={(e)=>handelSubmit(handelSearch , e)}>
            <TextInput placeholder={'Search.. .'} styles={'w-[18rem] lg:w-[38rem] rounded-l-full py-3'} onChangeFunc={(e)=>{setSearchInput(e.target.value)}} />
            <CustomButton containerStyles={`bg-[#065AD8] text-white px-6 py-[0.69rem] mt-2 rounded-r-full`} type={'sbmit'} title={'Search'} />
       </form>
       <div className="flex gap-4 items-center text-ascent1 text-base md:text-xl ">
           <button onClick={handelTheme}> 
             {theme === 'light' ? <BsMoon/> : <BsSunFill/>}
           </button>
           <div className="hidden lg:flex">
                <IoMdNotificationsOutline/>
           </div>
           <div className="">
            <button type={'button'} onClick={handelLOgout} className="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"  >Log Out</button>
           </div>
       </div>
    </div>
  );
};

export default TopBar;
