import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { currentUser } from "../../redux/session";

const CommentTile = ({ comment }) => {
    const currentUsers = useSelector(currentUser);
    return (
        <>
            <div>
                <h3>{comment.commentText}</h3>
                <h3>{comment.userId}</h3>
                {comment.userId === currentUsers.id && <div>
                    <button>Edit Comment</button>
                </div>}
            </div >
        </>
    );
};

export default CommentTile;
