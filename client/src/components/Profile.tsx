import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import bannerImg from "../Images/banner.jpg";
import profilePicture from "../Images/default.jpg";
import { Link } from "react-router-dom";
import { apiAxios } from "../App";
import { IPost } from "../types/IPost";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { IComment } from "../types/IComment";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const [post, setPosts] = useState<IPost[] | null>(null);
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [isPost, setIsPost] = useState(true);
  const { state, dispatch } = useContext(UserContext);
  const user = state.user;

  const getUserPost = async () => {
    try {
      const userPost = await apiAxios.get(`user/${user?.tag}`);
      setPosts(userPost.data.posts);
      setComments(userPost.data.comments);
    } catch (error) {}
  };

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <div className="flex flex-col w-full bg-gray rounded">
      <div className="relative w-full ">
        <img src={bannerImg} alt="" className="bg-cover max-h-72 w-full " />
        <img
          src={profilePicture}
          alt=""
          className="w-1/4 rounded-full  absolute top-1/2 border-8 m-2 border-lightGray"
        />
      </div>
      <div className="flex flex-col p-4" style={{ marginTop: "10%" }}>
        <div className="flex flex-col justify-center">
          <Link to={`/user/${user?.tag}`} className="text-lg font-bold">
            {user?.name}
          </Link>

          <Link to={`/user/${user?.tag}`} className="text-sm font-light">
            @{user?.tag}
          </Link>
        </div>
        <div className=" flex ">
          <div className=" flex py-4">Bio</div>
        </div>
        <div className="flex row">
          <button
            className={
              isPost
                ? "bg-black text-gray font-bold px-2 py-2 border border-black rounded w-1/2"
                : "bg-gray hover:bg-lightGray text-black font-bold px-2 py-2 border border-black rounded w-1/2"
            }
            onClick={() => setIsPost(true)}
          >
            Posts
          </button>
          <button
            className={
              isPost
                ? "bg-gray hover:bg-lightGray text-black font-bold px-2 py-2 border border-black rounded w-1/2"
                : "bg-black text-gray font-bold px-2 py-2 border border-black rounded w-1/2"
            }
            onClick={() => setIsPost(false)}
          >
            Comments
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-grow flex-col bg-white min-h-screen w-full">
          <div className="flex flex-col w-full">
            {isPost
              ? post?.map((e, i) => <Post key={i} post={e} />)
              : comments?.map((e, i) => (
                  <div className="px-4 border-b hover:bg-lightGray">
                    <Link to={"/post/" + e.post?.id + "#" + e.id}>
                      <Comment key={i} comment={e} />
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
