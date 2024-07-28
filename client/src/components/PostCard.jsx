import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const PostCard = ({ post, user, deletePost, likePost  }) => {
    // const {user} = useSelector((state)=>state.user)
  const [showAll, setShowAll] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(false);

  return (
    <div  className="mb-2 bg-primary p-4 rounded-xl">
      <div className="flex gap-3 items-center mb-2">
        <Link to={"/profile/" + post?.user?._id}>
          <img
            src={post.user.picture}
            alt="user Image"
            className="w-14 h-14 object-cover rounded-full "
          />
        </Link>
        <div className="w-full flex justify-between ">
          <div className="">
            <Link to={"/profile/" + post?.user?._id}>
              <p className="font-medium text-lg text-ascent1">
                {post?.user?.firstName} {post?.user?.lastName}
              </p>
            </Link>
            <span className="text-ascent2">{post?.user?.location}</span>
          </div>
          <span className="text-ascent2">
            {moment(post?.createsAt ?? "2024-3-15").fromNow()}
          </span>
        </div>
      </div>
      <div className="">
        <p className="text-ascent2">
          {showAll === post._id ? post?.text : post?.text.slice(0, 150)}
          {post?.text.length > 301 &&
            (showAll === post._id ? (
              <span
                className="text-blue font-medium ml-2 cursor-pointer"
                onClick={() => {
                  setShowAll(0);
                }}
              >
                Show Less
              </span>
            ) : (
              <span
                className="text-blue font-medium ml-2 cursor-pointer"
                onClick={() => {
                  setShowAll(post._id);
                }}
              >
                Show More
              </span>
            ))}
        </p>
        {
            post?.image && (
                <img src={post?.image}  alt="post image" className="w-full mt-2 max-h-[700px] object-cover rounded-lg"/>
            )
        }
      </div>
      <div className="mt--4 flex justify-between items-center px-3 py-2 text-ascent2  text-base border-t border-[#66666645]">
        <p className="flex gap-2 items-center text-base cursor-pointer">
            {post.likes.length>0 && post.likes?.map((like)=> like?.user._id === user._id ? true : false)   ? <BiSolidLike size={20 } className="text-blue" /> : <BiLike size={20} />}
            {post?.likes?.length} Likes
        </p>
        <p className="flex gap-2 items-center text-base cursor-pointer ">
            <BiComment size={20}/>
            {post?.comments?.length} Comments
        </p>
        {user?._id === post?.user?._id && (
            <div className="">
                <MdOutlineDeleteOutline size={20}/>
                <span>Delete</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
