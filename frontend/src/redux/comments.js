import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";


// ACTION TYPE
const ADD_COMMENT = 'comments/add';
const LOAD_COMMENTS = 'comments/load';
const DELETE_COMMENT = 'comments/delete';
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
const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        payload: comment
    };
};
// THUNKS
export const thunkAddComment = (comment, postId) => async (dispatch) => {
    console.log(comment, '');
    const response = await csrfFetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    });
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

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteComment(commentId));
    } else {
        const error = await response.json();
        return error;
    }
};
// SELECTORS
export const commentsArray = createSelector((state) => state.comments, (comments) => {
    return Object.values(comments);
});

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

        case DELETE_COMMENT: {
            delete commentsState[action.payload];
            return commentsState;
        }

        default: {
            return commentsState;
        }
    }
};

export default commentsReducer;
