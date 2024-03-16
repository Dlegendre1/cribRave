import React from 'react';
import { useEffect, useState } from "react";
import { postsArray, thunkLoadPosts } from "../../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import PostTile from "./PostTile";


const Splash = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postsArray);

  console.log(posts, '##############################');
  useEffect(() => {
    dispatch(thunkLoadPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>CribRave</h1>
      {posts.map((post) => {
        return (
          <PostTile postInfo={post} key={post.id} />
        );
      })}
    </div>
  );
};

export default Splash;
