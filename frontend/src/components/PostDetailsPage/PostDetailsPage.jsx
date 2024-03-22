import { postsArray } from "../../redux/posts";
import { useEffect } from "react";
import PostTile from "../Splash/PostTile";
import CommentTile from "./CommentTile";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkPostDetails } from "../../redux/posts";
import { commentsArray, thunkLoadComments } from "../../redux/comments";


const PostDetailsPage = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(postsArray);
    const post = posts.find(post => post.id === parseInt(postId));
    const comments = useSelector(commentsArray);
    useEffect(() => {
        dispatch(thunkPostDetails(post));
        dispatch(thunkLoadComments(parseInt(postId)));
    }, [dispatch]);
    
    return (
        <>
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
            <button>Add Comment</button>
        </>
    );
};


export default PostDetailsPage;
