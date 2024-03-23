import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteComment } from "../../redux/comments";

const DeleteComment = (comment) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e, id) => {
        e.preventDefault();
        return dispatch(thunkDeleteComment(id))
            .then(closeModal);
    };
    return (
        <>
            <h2>Delete comment?</h2>
            <div>
                <button onClick={(e) => handleDelete(e, comment.comment.id)}>Delete Comment</button>
                <button onClick={closeModal}>Keep Comment</button>
            </div>
        </>
    );
};

export default DeleteComment;
