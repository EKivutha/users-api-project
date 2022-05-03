import {
    RETRIEVE_POST,
    RETRIEVE_POSTS,
    RETRIEVE_POSTS_BY_USERID
} from '../actions/types'

const initialState:any = [];
function postReducer(posts = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_POST:
      return payload; //posts.filter((id:Number) => id === payload.id);
    case RETRIEVE_POSTS:
      return payload;
    case RETRIEVE_POSTS_BY_USERID:
      return  payload;//posts.filter((userId:any) => userId === payload.userId);;
    default:
      return posts;
  }
};
export default postReducer;