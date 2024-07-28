import { Link } from "react-router-dom";
import NoProfileImg from "../assets/userprofile.png";

const FriendsCard = ({ friends }) => {
  return (
    <div>
      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5  ">
        <div className="flex items-center justify-between text-ascent1 pb-2 border-b  border-[#66666645]">
          <span>Friends</span>
          <span>{friends?.length}</span>
        </div>
        <div className="w-full flex flex-col gap-4 pt-4">
          {friends?.map((friend) => {
            return (
              <Link
                to={`profile/${friend?._id}`}
                key={friend?._id}
                className="w-full flex  items-center gap-4 cursor-pointer "
              >
                <img src={friend?.picture ?friend?.picture  : NoProfileImg} alt={friend?.email} className="w-10 h-10 object-cover rounded-full  " />
               
               <div className="flex-1">

                <p className="text-ascent1 text-base font-medium ">
                  {friend?.firstName} {friend?.lastName}
                </p>
                <p className="text-ascent2">
                {friend?.occupation ?? "No Occupation"}
              </p>
               </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
