import { useModal } from "../../context/Modal";
import { thunkDeletePost } from "../../redux/posts";
import { useDispatch} from "react-redux";

const DeleteUserPost = (post) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e, id) => {
        e.preventDefault();
        return dispatch(thunkDeletePost(id))
            .then(closeModal);
    };

    return (
        <>
            <h2>Do you want to delete this post?</h2>
            <div>
                <button onClick={(e) => handleDelete(e, post.post.id)}>Delete Post</button>
                <button onClick={closeModal}>Keep Post</button>
            </div>
        </>
    );
};

export default DeleteUserPost;
