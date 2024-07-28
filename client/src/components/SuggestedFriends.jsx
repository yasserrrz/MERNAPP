
import { Link } from "react-router-dom";
import NoProfileImg from "../assets/userprofile.png";
import {BsPersonFillAdd} from "react-icons/bs";


const SuggestedFriends =  ({suggestedFriend}) => {
    return (
      <div className="flex items-center justify-between ">
          <Link to={'/profile/'+suggestedFriend?._id} className="w-full flex items-center cursor-pointer ">
          <img src={suggestedFriend?.picture ?suggestedFriend?.picture  : NoProfileImg} alt={suggestedFriend?.email} className="w-10 h-10 object-cover rounded-full  " />
          <div className=" flex-1 p-2  ">
              <p className="text-xs font-medium m-0 p-0 text-ascent1">
                  {suggestedFriend?.firstName} {suggestedFriend?.lastName}
              </p>
              <span className="text-sm text-ascent2">
                  {suggestedFriend?.occupation?? "No Occupation"}
              </span>
          </div>
          </Link>
          <div className="flex gap-1 ">
             <button className="bg-[#0444a430] text-sm text-white p-1 rounded " onClick={()=>{}}>
                <BsPersonFillAdd size={20} className="text-[#0f52b6]"/>
             </button>
          </div>
      </div>
    )
  }

export default SuggestedFriends