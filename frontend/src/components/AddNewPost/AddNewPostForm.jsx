import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkAddPost } from "../../redux/posts";
import { useNavigate } from "react-router-dom";


const NewPostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const postDetails = {
            title,
            description
        };

        const res = await dispatch(thunkAddPost(postDetails));

        if (res.error) {
            setErrors(prevErrors => ({
                ...prevErrors,
                ...(res.error.title && { title: 'Title invalid' }),
                ...(res.error.description && { description: 'Description invalid' })
            }));
        } else {
            setErrors({});
            navigate(`/`);
        }
    };

    return (
        <>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors && errors.title && <div>{errors.title}</div>}
                </div>

                <div>
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    {errors && errors.description && <div>{errors.description}</div>}
                </div>

                <button type="submit">Create Post</button>
            </form>
        </>
    );


};

export default NewPostPage;
