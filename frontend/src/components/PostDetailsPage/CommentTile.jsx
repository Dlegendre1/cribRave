import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import DeleteComment from "./DeleteComment";
import { useState } from "react";
import { thunkEditComment } from "../../redux/comments";


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

        const response = await dispatch(thunkEditComment(commentDetails));

        if (response) {
            setErrors(prevErrors => ({
                ...prevErrors,
                ...(response.commentText && { name: 'Invalid comment' })
            }));
        }
        setIsEditing(!isEditing);
    };

    return (
        <>
            {isEditing && <>
                <div>
                    <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                </div>
                <button type="button" onClick={handleSubmit}>Submit</button>
            </>}
            <div>
                {!isEditing && <>
                    <h3>{comment.commentText}</h3>
                    <h3>{comment.userId}</h3>
                </>
                }
                {comment.userId === currentUsers.id && <div>
                    <button onClick={handleEdit}>Edit Comment</button>
                    <OpenModalButton
                        modalComponent={<DeleteComment comment={comment} />}
                        buttonText="Delete comment" />
                </div>}
            </div>
        </>
    );
};

export default CommentTile;
