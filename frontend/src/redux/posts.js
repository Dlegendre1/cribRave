import { createSelector } from 'reselect';

// ACTION TYPE
const ADD_POST = 'posts/add';
const LOAD_POSTS = 'posts/load';





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

// SELECTORS
export const postsArray = createSelector((state) => state.posts, (posts) => {
    return Object.values(posts);
});

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

        default: {
            return postsState;
        }
    }
};

export default postsReducer;
