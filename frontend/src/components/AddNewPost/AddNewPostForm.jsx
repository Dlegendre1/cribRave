import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkAddPost } from "../../redux/posts";
import { useNavigate } from "react-router-dom";
import './AddNewPostForm.css';

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
        try {
            await dispatch(thunkAddPost(postDetails));
            setErrors({});
            navigate(`/`);
        } catch (error) {
            error = await error.json();
            setErrors(prevErrors => ({
                ...prevErrors,
                ...(error.title && { title: error.title }),
                ...(error.description && { description: error.description })
            }));
        }

    };

    return (
        <>
            <div className="create-new-post-form">
                <h2>Create New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="title-container">
                        <label>Title</label>
                        <input type="text" value={title} required minLength={5} maxLength={100} onChange={(e) => setTitle(e.target.value)} />
                        {errors && errors.title && <div className="error">{errors.title}</div>}
                    </div>
                    <br></br>
                    <div className="description-container">
                        <label>Description</label>
                        <textarea value={description} required minLength={5} maxLength={1000} onChange={(e) => setDescription(e.target.value)} />
                        {errors && errors.description && <div className="error">{errors.description}</div>}
                    </div>
                    <button type="submit">Create Post</button>
                </form>
            </div>
        </>
    );


};

export default NewPostPage;
