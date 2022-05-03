import {
    RETRIEVE_POST,
    RETRIEVE_POSTS,
    RETRIEVE_POSTS_BY_USERID
} from './types'

import PostService from '../services/PostService';

export const retrievePost = (id:any) => async (dispatch:any) => {
    try {
        const res = await PostService.get(id);
        dispatch({
            type: RETRIEVE_POST,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const retrievePosts = () => async (dispatch:any) => {
    try {
        const res = await PostService.getAll();
        dispatch({
            type: RETRIEVE_POSTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const findPostsByUserId = (userId:any) => async (dispatch:any) => {
    try {
        const res = await PostService.findPostByUserId(userId);
        dispatch({
            type: RETRIEVE_POSTS_BY_USERID,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};