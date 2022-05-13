import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findPostsByUserId, retrievePost, retrievePosts } from '../actions/posts';

import { useParams } from 'react-router-dom';

import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import Post from './postModal';
import User from './userModal';
import {  retrieveUsers } from '../actions/users';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function ApartmentList() {
    const user: User[] = useSelector((state:any) => state.users);
    let [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch<any>(retrieveUsers());
      setLoading(false);
    }, [dispatch]);


  return loading ? (
    <ClipLoader loading={loading}  size={150} css={override} />
 ) :(
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {user &&
            user.map((user, index) => (
      <ListItem alignItems="center" key ={ index}>
        
        <ListItemText
          primary= {user.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              {user.address.suite}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>))}
      <Divider variant="inset" component="li" />
    </List>
  );
}
