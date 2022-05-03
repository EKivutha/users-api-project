import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import User from './userModal';
import { retrieveUser } from '../actions/users';

export const Form = ({ onSubmit }:{onSubmit:any}) => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const user: User = useSelector((state:any) => state.users);
    useEffect(() => {
        dispatch<any>(retrieveUser(userId));
       
      }, [dispatch]);
  
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" id="name"  placeholder={user.name}/>
      </div>
      
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
