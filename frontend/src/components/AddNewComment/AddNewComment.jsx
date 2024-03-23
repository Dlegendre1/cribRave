import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkAddComment } from "../../redux/comments";

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

        const res = await dispatch(thunkAddComment(commentDetails, postId));

        if (res.error) {
            setErrors(prevErrors => ({
                ...prevErrors,
                ...(res.error.commentText && { commentText: 'Invalid comment' })
            }));
        } else {
            setErrors({});
            closeComment();
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Comment</label>
                    <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                    {errors && errors.commentText && <div>{errors.commentText}</div>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default AddNewComment;
