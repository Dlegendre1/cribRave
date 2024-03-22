import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";


// ACTION TYPE
const ADD_COMMENT = 'comments/add';
const LOAD_COMMENTS = 'comments/load';
// ACTION CREATORS
const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    };
};

const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        payload: comments
    };
};
// THUNKS
export const thunkAddComment = (comment) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${comment.postId}`);
    if (response.ok) {
        const newComment = await response.json();
        dispatch(addComment(newComment));
        return newComment;
    } else {
        const error = response.json();
        return error;
    }
};

export const thunkLoadComments = (postId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${postId}`);
    if (response.ok) {
        const postComments = await response.json();
        dispatch(loadComments(postComments));
        return postComments;
    } else {
        const error = res.json();
        return error;
    }
};
// SELECTORS
export const commentsArray = createSelector((state) => state.comments, (comments) => {
    return Object.values(comments);
});

export const postCommentsArray = createSelector(commentsArray,);
// REDUCER
export const commentsReducer = (state = {}, action) => {
    let commentsState = { ...state };
    switch (action.type) {
        case LOAD_COMMENTS: {
            commentsState = {};
            action.payload.Comments.forEach((comment) => {
                commentsState[comment.id] = comment;
            });
            return commentsState;
        }

        case ADD_COMMENT: {
            commentsState[action.payload.id] = action.payload;
            return commentsState;
        }

        default: {
            return commentsState;
        }
    }
};

export default commentsReducer;
