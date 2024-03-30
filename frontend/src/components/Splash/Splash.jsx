import React from 'react';
import { useEffect, useState } from "react";
import { postsArray, thunkLoadPosts, userPostsArray } from "../../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import PostTile from "./PostTile";
import { useNavigate } from 'react-router-dom';
import { commentsArray } from '../../redux/comments';
import { currentUser } from '../../redux/session';
import './Splash.css';


const Splash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(postsArray);
  const user = useSelector(currentUser);
  const comments = useSelector(commentsArray);

  useEffect(() => {
    dispatch(thunkLoadPosts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/posts/new`);
  };

  return (
    <>
      <div className='full-page'>
        <div className='splash-page'>
          <div>
            {user && <button type='submit' onClick={handleSubmit}>Create new post!</button>}
          </div>
          {posts.map((post) => {
            return (
              <div className='splash-post-info'>
                <PostTile postInfo={post} key={post.id} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Splash;
