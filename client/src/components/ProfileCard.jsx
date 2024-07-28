import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NoProfileImg from "../assets/userprofile.png";
import { LiaEditSolid } from "react-icons/lia";
import { CiLocationOn } from "react-icons/ci";
import {
  BsBriefcase,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import moment from "moment";
const ProfileCard = ({ user }) => {
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handelEditeProfile = () => {
    console.log("handelEditeProfile");

    console.log(userId);
  };
  const addRemoveFriend = () => {
    console.log("addRemoveFriend");
    console.log("user id", userId);
  };
  return (
    <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4 ">
      <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645] ">
        <Link to={`/profile/${user?._id}`}>
          <div className="flex gap-2">
            <img
              src={user.picture ? user.picture : NoProfileImg}
              alt={user?.email}
              className="w-14 h-14 object-cover rounded-full "
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium text-ascent1 ">
                {user?.firstName} {user?.lastName}
              </p>
              <span className="text-ascent2">
                {user?.occupation ?? "No Occupation"}
              </span>
            </div>
          </div>
        </Link>
        <div className="">
          {user?._id === userId ? (
            <LiaEditSolid
              className="text-blue cursor-pointer"
              onClick={() => {
                handelEditeProfile();
              }}
            />
          ) : (
            <button
              className="bg-[#0444a430] text-sm text-white p-1 rounded "
              onClick={() => addRemoveFriend()}
            ></button>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col  py-4 border-b border-[#6666645] ">
        <div className="flex gap-2 items-center text-ascent2 ">
          <CiLocationOn className="text-xl text-ascent1" />
          <span className="">{user?.location ?? "Add a Location"}</span>
        </div>
        <div className="flex gap-2 items-center text-ascent2">
          <BsBriefcase className="text-lg text-ascent1" />
          <span className="">{user?.occupation ?? "Add a occupation"}</span>
        </div>
      </div>
      <div className="w-full flex flex-col  py-4 border-b border-[#6666645] ">
        <p className="text-xl font-semibold text-ascent1">
          {user?.friends?.length} Friends
        </p>
        <div className="flex  justify-between">
          <span className="text-ascent2">Who viewed your profile</span>
          <span className="text-ascent1 text-lg">{user?.viewedProfile}</span>
        </div>
        <span className="text-blue text-base">
          {user?.confirmed ? "Verfied Account" : "Not Verified"}
        </span>
        <div className="flex items-center  justify-between">
          <span className="text-ascent2">Joined</span>
          <span className="text-ascent1 text-base">
            {moment(user?.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 pb-6  py-4 border-b border-[#6666645] ">
        <p className="text-lg font-semibold text-ascent1">Social Profile</p>
        <div className="flex gap-2 items-center text-ascent2">
          <BsInstagram />
          <span>Instagram</span>
        </div>
        <div className="flex gap-2 items-center text-ascent2">
          <BsFacebook />
          <span>Facebook</span>
        </div>
        <div className="flex gap-2 items-center text-ascent2">
          <BsTwitter />
          <span>Twitter</span>
        </div>
        <div className="flex gap-2 items-center text-ascent2">
          <BsLinkedin />
          <span>LinkedIn</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
