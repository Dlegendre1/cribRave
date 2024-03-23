import { createSelector } from 'reselect';
import { currentUser } from './session';
import { csrfFetch } from './csrf';

// ACTION TYPE
const ADD_POST = 'posts/add';
const LOAD_POSTS = 'posts/load';
const POST_DETAILS = 'posts/details';
const DELETE_POST = 'posts/delete';



// ACTION CREATORS
const addPost = (post) => {
    return {
        type: ADD_POST,
        payload: post
    };
};

const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        payload: posts
    };
};

const postDetails = (post) => {
    return {
        type: POST_DETAILS,
        payload: post
    };
};

const deletePost = (post) => {
    return {
        type: DELETE_POST,
        payload: post
    };
};

// THUNKS
export const thunkAddPost = (post) => async (dispatch) => {
    const response = await csrfFetch("/api/posts/new", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });
    if (response.ok) {
        const newPost = await response.json();
        dispatch(addPost(newPost));
        return newPost;
    } else {
        const error = response.json();
        return error;
    }
};

export const thunkLoadPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts");
    if (response.ok) {
        const allPosts = await response.json();
        dispatch(loadPosts(allPosts.Posts));
    }
    else {
        const error = response;
        return error;
    }
};

export const thunkPostDetails = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(postDetails(data.Post));
        return data;
    } else {
        const error = await response.json();
        return error;
    }
};

export const thunkEditPost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });
    if (response.ok) {
        const editedPost = await response.json();
        dispatch(postDetails(editedPost));
        return editedPost;
    } else {
        const error = await response.json();
        return error;
    }
};

export const thunkDeletePost = (postId) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deletePost(postId));
    } else {
        const error = await response.json();
        return error;
    }
};

// SELECTORS
export const postsArray = createSelector((state) => state.posts, (posts) => {
    return Object.values(posts);
});

export const userPostsArray = createSelector(postsArray, currentUser, (posts, user) => {
    return posts.filter((post) => post.userId === user.id);
});

export const singularPost = (postId) => {
    return createSelector(postsArray, (posts) => {
        return posts.find((post) => post.id === parseInt(postId));
    });
};

// REDUCER
export const postsReducer = (state = {}, action) => {
    let postsState = { ...state };
    switch (action.type) {
        case LOAD_POSTS: {
            postsState = {};
            action.payload.forEach((post) => {
                postsState[post.id] = post;
            });
            return postsState;
        }
        case ADD_POST: {
            postsState[action.payload.id] = action.payload;
            return postsState;
        }
        case POST_DETAILS: {
            postsState[action.payload.id] = action.payload;
            return postsState;
        }

        case DELETE_POST: {
            delete postsState[action.payload];
            return postsState;
        }

        default: {
            return postsState;
        }
    }
};

export default postsReducer;
