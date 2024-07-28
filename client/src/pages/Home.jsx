import { useSelector, useDispatch } from "react-redux";

import TopBar from "../components/TopBar";
import ProfileCard from "../components/ProfileCard";
import PostCard from "../components/PostCard";
import FriendsCard from "../components/FriendsCard";
import FriendRequestCard from "../components/FriendRequestCard";
import SuggestedFriends from "../components/SuggestedFriends";
import HomePageForm from "../components/HomePageForm";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from 'axios'
import { setPosts } from "../redux/postSlice";


const Home = () => {
  const { user , token } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [loading , setLoading] = useState(false);
  const dispatch = useDispatch();
  const getFeedPosts=()=>{
    setLoading(true);
    console.log(token);
    axios.get(`http://localhost:3001/post`,{
      headers: { Authorization: `${token}` } 
    }).then(({data})=>{
      console.log(data);
        setLoading(false);
        dispatch(setPosts(data.posts));
        console.log( "posts inside getFeedPosts ", posts);
    }).catch((error)=>{
      console.log(error);
      setLoading(false);
    })
  }
  useEffect(() => {
    getFeedPosts(); // Fetch posts when component mounts
  }, []);

  useEffect(() => {
    // This will run every time 'posts' state changes
    console.log("Posts have been updated:", posts);
  }, [posts]);
  return (
    <>
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden ">
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full  ">
          <div className="left hidden w-1/3 lg:w-1/4 h-full md:flex  flex-col gap-6 overflow-y-auto">
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>
          <div className="center flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto ">
                <HomePageForm /> 
                {
                  loading ? <Loading/> : posts?.length>0 ?(
                    posts.map((post)=>(
                   <div className="" key ={post._id} ><PostCard  post={post} user={user}  delete={()=>{}} likePost = {()=>{}}/></div>  
                    ))
                  ) : (
                    <div className="flex w-full h-full items-center justify-center ">
                      <p className="text-lg text-ascent2">
                        No Post Avilable
                      </p>
                    </div>
                  )
                }
                <div className="">

                </div>
          </div>
          <div className="right hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto ">
            <div className="friends request w-full bg-primary shadow-sm rounded-lg px-6 py-5 ">
              <div className="flex  items-center justify-between text-xl text-ascent1 pb-2 border-b border-[[#66666645]">
                <span className="text-2xl font-semibold">Friends Requests</span>
                <span className="text-2xl font-semibold">
                  {user?.friendsRequest?.length}
                </span>
              </div>
              <div className="w-full flex flex-col gab-4 pt-4    ">
                <FriendRequestCard friendRequest={user?.friends[0]} />
              </div>
            </div>
            <div className="suggested friends w-full bg-primary shadow-sm rounded-lg px-6 py-5">
              <div className="flex  items-center justify-between text-xl text-ascent1 pb-2 border-b border-[[#66666645]">
                <span className="text-2xl font-semibold">
                  Suggested Friends
                </span>
              </div>
              <div className="w-full flex flex-col gab-4 pt-4    ">
                <SuggestedFriends suggestedFriend={user?.friends[0]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
