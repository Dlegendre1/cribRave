import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { currentUser } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import DeleteComment from "./DeleteComment";

const CommentTile = ({ comment }) => {
    const currentUsers = useSelector(currentUser);
    return (
        <>
            <div>
                <h3>{comment.commentText}</h3>
                <h3>{comment.userId}</h3>
                {comment.userId === currentUsers.id && <div>
                    <button>Edit Comment</button>
                    <OpenModalButton
                        modalComponent={<DeleteComment comment={comment} />}
                        buttonText="Delete comment" />

                </div>}
            </div >
        </>
    );
};

export default CommentTile;
