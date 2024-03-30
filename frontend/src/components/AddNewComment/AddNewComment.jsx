import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkAddComment } from "../../redux/comments";
import './AddNewComment.css';

const AddNewComment = ({ postId, closeComment }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [commentText, setCommentText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const commentDetails = {
            commentText
        };

        try {
            await dispatch(thunkAddComment(commentDetails, postId));
            setErrors({});
            closeComment();
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
            <form className="add-comment-form" onSubmit={handleSubmit}>
                <div className="comment-container">
                    <textarea required maxLength={255} value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                    {errors && errors.commentText && <div className="error">{errors.commentText}</div>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default AddNewComment;
