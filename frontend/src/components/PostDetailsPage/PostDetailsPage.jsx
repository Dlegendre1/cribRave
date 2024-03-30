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
import './PostDetailsPage.css';

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

        try {
            await dispatch(thunkEditPost(postDetails));
            setIsEditing(!isEditing);
        } catch (error) {
            if (error) {
                error = await error.json();
                setErrors(prevErrors => ({
                    ...prevErrors,
                    ...(error.title && { title: error.title }),
                    ...(error.description && { description: error.description })
                }));
            }
        }
    };

    return (
        <>
            <div className="post-details-page">
                {post && <>
                    <div>
                        {isEditing && <>
                            <div>
                                <input type="text" value={title} required minLength={5} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <input type="text" value={description} required minLength={5} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            {errors.title && <div className="error">{errors.title}</div>}
                            {errors.description && <div className="error">{errors.description}</div>}
                            <button type="button" onClick={handleSubmit}>Submit</button>
                        </>}
                        {!isEditing && <PostTile postInfo={post} />}
                    </div>
                    <br></br>
                    {user && user.id === post.userId && <button onClick={handleEdit}>Edit</button>}
                    <div className="comments">
                        <h2>Comments</h2>
                        <hr></hr>
                        {comments.map((comment) => {
                            return (<>
                                <div>
                                    <CommentTile comment={comment} />
                                </div>
                                <hr></hr>
                            </>
                            );
                        })}
                    </div>
                    <div>
                        {showAddComment && <AddNewComment postId={parseInt(postId)} closeComment={closeAddComment} />}
                    </div>
                    {user && <button className="add-comment-button" onClick={handleClick}>Add Comment</button>}
                </>
                }
            </div>
        </>
    );

};


export default PostDetailsPage;
