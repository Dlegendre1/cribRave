import { useNavigate } from "react-router-dom";
import './PostTile.css';

const PostTile = ({ postInfo }) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        navigate(`/posts/${postInfo.id}`);
    };
    return (
        <>
            <hr></hr>
            <div className="post-info" onClick={handleClick}>
                <h2 className="post-title">{postInfo.title}</h2>
                <div className="post-description">{postInfo.description}</div>
                <p className="post-user">{postInfo.username}</p>
            </div>
        </>
    );
};

export default PostTile;
