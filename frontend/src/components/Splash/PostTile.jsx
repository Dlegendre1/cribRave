import { useNavigate } from "react-router-dom";


const PostTile = ({ postInfo }) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        navigate(`/posts/${postInfo.id}`);
    };
    return (
        <>
            <div onClick={handleClick}>
                <h2>{postInfo.title}</h2>
                <div>{postInfo.description}</div>
            </div>
        </>
    );
};

export default PostTile;
