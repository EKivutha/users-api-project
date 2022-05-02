import {
    RETRIEVE_USER,
    RETRIEVE_USERS,
    RETRIEVE_USERS_BY_TITLE
} from './types'

import UserService from '../services/UserService'

export const retrieveUser = (id:Number) => async (dispatch:any) => {
    try {
        const res = await UserService.get(id);
        dispatch({
            type: RETRIEVE_USERS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const retrieveUsers = () => async (dispatch:any) => {
    try {
        const res = await UserService.getAll();
        dispatch({
            type: RETRIEVE_USERS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const findUserByTitle = (title:any) => async (dispatch:any) => {
    try {
        const res = await UserService.findByTitle(title);
        dispatch({
            type: RETRIEVE_USERS_BY_TITLE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};