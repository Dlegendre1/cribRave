import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import DeleteComment from "./DeleteComment";
import { useState } from "react";
import { thunkEditComment } from "../../redux/comments";
import './CommentTile.css';

const CommentTile = ({ comment }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [commentText, setCommentText] = useState(comment.commentText);
    const [errors, setErrors] = useState({});
    const currentUsers = useSelector(currentUser);

    const handleEdit = () => {
        setCommentText(comment.commentText);
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const commentDetails = {
            ...comment,
            commentText
        };

        try {
            await dispatch(thunkEditComment(commentDetails));
            setIsEditing(!isEditing);
        }
        catch (error) {
            error = await error.json();
            setErrors(prevErrors => ({
                ...prevErrors,
                ...(error.commentText && { commentText: error.commentText })
            }));
        }
    };

    return (
        <>
            {isEditing && <>
                <div>
                    <textarea className="comment-text" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                </div>
                {errors && errors.commentText && <p className="error">{errors.commentText}</p>}
                <button type="button" onClick={handleSubmit}>Submit</button>
            </>}
            <div>
                {!isEditing && <>
                    <p>{comment.commentText}</p>
                    <h3>{comment.username}</h3>
                </>
                }
                {currentUsers && comment.userId === currentUsers.id && <div className="edit-delete-button-container">
                    {!isEditing && <>
                        <button onClick={handleEdit}>Edit Comment</button>
                        <OpenModalButton
                            modalComponent={<DeleteComment comment={comment} />}
                            buttonText="Delete comment" />
                    </>}
                </div>}
            </div>
        </>
    );
};

export default CommentTile;
