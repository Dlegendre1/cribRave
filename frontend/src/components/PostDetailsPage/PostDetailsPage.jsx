import { postsArray, singularPost, thunkEditPost } from "../../redux/posts";
import { useEffect, useState } from "react";
import PostTile from "../Splash/PostTile";
import CommentTile from "./CommentTile";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkPostDetails } from "../../redux/posts";
import { commentsArray, thunkLoadComments } from "../../redux/comments";
import AddNewComment from "../AddNewComment/AddNewComment";
import DeleteComment from "./DeleteComment";
import { currentUser } from "../../redux/session";

const PostDetailsPage = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const post = useSelector(singularPost(parseInt(postId)));
    const comments = useSelector(commentsArray);
    const user = useSelector(currentUser);

    const [showAddComment, setShowAddComment] = useState(false);
    const [isEditing, setIsEditing] = useState(state?.isEditing || false);
    const [title, setTitle] = useState(post?.title || '');
    const [description, setDescription] = useState(post?.description || '');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        dispatch(thunkPostDetails(parseInt(postId)));
        dispatch(thunkLoadComments(parseInt(postId)));
    }, [dispatch]);

    const handleClick = async (e) => {
        e.preventDefault();
        setShowAddComment(!showAddComment);
    };

    const handleEdit = () => {
        setDescription(post.description);
        setTitle(post.title);
        setIsEditing(!isEditing);
    };

    const closeAddComment = () => {
        setShowAddComment(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const postDetails = {
            ...post,
            title,
            description
        };

        const response = await dispatch(thunkEditPost(postDetails));

        if (response) {
            setErrors(prevErrors => ({
                ...prevErrors,
                ...(response.title && { name: 'Invalid title' }),
                ...(response.description && { address: 'Invalid description' }),
            }));
        }
        setIsEditing(!isEditing);
    };

    return (
        <>
            {post && <>
                <div>
                    {isEditing && <>
                        <div>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <button type="button" onClick={handleSubmit}>Submit</button>
                    </>}
                    {!isEditing && <PostTile postInfo={post} />}
                </div>
                {user.id === post.userId && <button onClick={handleEdit}>Edit</button>}
                <div>
                    <h2>Comments</h2>
                    {comments.map((comment) => {
                        return (<>
                            <div>
                                <CommentTile comment={comment} />
                            </div>
                        </>
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
