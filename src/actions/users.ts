import {
    RETRIEVE_USER,
    RETRIEVE_USERS,
    UPDATE_USER,
    RETRIEVE_USERS_BY_TITLE
} from './types'

import UserService from '../services/UserService'

export const retrieveUser = (id:any) => async (dispatch:any) => {
    try {
        const res = await UserService.get(id);
        dispatch({
            type: RETRIEVE_USER,
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
export const updateUser = (id: any, data: any) => async (dispatch:any) => {
    try {
      const res = await UserService.update(id, data);
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
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