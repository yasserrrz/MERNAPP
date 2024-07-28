import { Link } from "react-router-dom";
import NoProfileImg from "../assets/userprofile.png";
import CustomButton from "./CustomButton";

const FriendRequestCard = ({friendRequest}) => {
  return (
    <div className="flex items-center justify-between ">
        <Link to={'/profile/'+friendRequest?._id} className="w-full flex items-center cursor-pointer ">
        <img src={friendRequest?.picture ?friendRequest?.picture  : NoProfileImg} alt={friendRequest?.email} className="w-10 h-10 object-cover rounded-full  " />
        <div className=" flex-1 p-2  ">
            <p className="text-xs font-medium m-0 p-0 text-ascent1">
                {friendRequest?.firstName} {friendRequest?.lastName}
            </p>
            <span className="text-sm text-ascent2">
                {friendRequest?.occupation?? "No Occupation"}
            </span>
        </div>
        </Link>
        <div className="flex gap-1 ">
        <CustomButton title={'Accept'} containerStyles={"bg-[#0444a4] text-xs text-white p-2 rounded-full"}/>
        <CustomButton title={'Deny'} containerStyles={ "border border-[#666]  text-xs text-ascent1 p-2 rounded-full"}/>
        </div>
    </div>
  )
}

export default FriendRequestCard