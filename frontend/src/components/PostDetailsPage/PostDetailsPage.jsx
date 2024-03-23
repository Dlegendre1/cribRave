import { postsArray, singularPost } from "../../redux/posts";
import { useEffect, useState } from "react";
import PostTile from "../Splash/PostTile";
import CommentTile from "./CommentTile";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkPostDetails } from "../../redux/posts";
import { commentsArray, thunkLoadComments } from "../../redux/comments";
import AddNewComment from "../AddNewComment/AddNewComment";
import DeleteComment from "./DeleteComment";

const PostDetailsPage = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(singularPost(parseInt(postId)));
    const comments = useSelector(commentsArray);
    const [showAddComment, setShowAddComment] = useState(false);
    console.log(post, '##################');

    useEffect(() => {
        dispatch(thunkPostDetails(parseInt(postId)));
        dispatch(thunkLoadComments(parseInt(postId)));
    }, [dispatch]);

    const handleClick = async (e) => {
        e.preventDefault();
        setShowAddComment(!showAddComment);
    };
    const closeAddComment = () => {
        setShowAddComment(false);
    };

    return (
        <>
            {post && <>
                <div>
                    <PostTile postInfo={post} />
                </div>
                <div>
                    <h2>Comments</h2>
                    {comments.map((comment) => {
                        return (
                            <div>
                                <CommentTile comment={comment} />
                            </div>
                        );
                    })}
                </div>
                <div>
                    {showAddComment && <AddNewComment postId={parseInt(postId)} closeComment={closeAddComment} />}
                </div>
                <button onClick={handleClick}>Add Comment</button>
            </>
            }
        </>
    );

};


export default PostDetailsPage;
