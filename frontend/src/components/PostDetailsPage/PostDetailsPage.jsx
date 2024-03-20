import { postsArray } from "../../redux/posts";
import { useEffect } from "react";
import PostTile from "../Splash/PostTile";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkPostDetails } from "../../redux/posts";


const PostDetailsPage = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkPostDetails(postId));
    }, [dispatch]);
    const posts = useSelector(postsArray);
    const post = posts.find(post => post.id === parseInt(postId));
    
    return (
        <>
            <div>
                <PostTile postInfo={post} />
            </div>
        </>
    );
};


export default PostDetailsPage;
