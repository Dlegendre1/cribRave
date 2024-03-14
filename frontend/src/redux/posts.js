// ACTION TYPE
const LOAD_POSTS = 'posts/load';





// ACTION CREATORS
const loadPosts = (posts) => {
    return {
        type: LOAD,
        payload: posts
    };
};



// THUNKS
export const thunkLoadPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts");
    if (response.ok) {
        const allPosts = await response.json();
        dispatch(loadPosts(allPosts));
    }
    else {
        const error = response;
        return error;
    }
};



// REDUCER
export const postsReducer = (state = {}, action) => {
    let postsState = { ...state };
    switch (action.type) {
        case LOAD_POSTS: {
            postsState = {};
            action.payload.posts.forEach((post) => {
                postsState[post.id] = post;
            });
            return postsState;
        }

        default: {
            return postsState;
        }
    }
};
