

const PostTile = ({ postInfo }) => {
    return (
        <>
            <div>{postInfo.title}</div>
            <div>{postInfo.description}</div>
        </>
    );
};

export default PostTile;
