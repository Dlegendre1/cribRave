import { useEffect } from "react";
import { thunkLoadPosts, userPostsArray } from "../../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import PostTile from "../Splash/PostTile";
import DeleteUserPost from "./DeleteUserPost";

const CurrentUserPosts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUserPosts = useSelector(userPostsArray);

    useEffect(() => {
        dispatch(thunkLoadPosts());
    }, [dispatch]);

    const handleEditPage = async (e, postId) => {
        e.preventDefault();
        navigate(`/posts/${postId}`, { state: { isEditing: true } });
    };
    return (
        <>
            <div>
                {currentUserPosts.map((post) => {
                    return (
                        <>
                            <div>
                                <PostTile postInfo={post} key={post.id} />
                            </div>
                            <div>
                                <button type="submit" onClick={(e) => handleEditPage(e, post.id)}>Edit post</button>

                                <OpenModalButton
                                    modalComponent={<DeleteUserPost post={post} />}
                                    buttonText="Delete post"
                                />

                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default CurrentUserPosts;
