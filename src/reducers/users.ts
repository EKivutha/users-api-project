import {
    RETRIEVE_USER,
    RETRIEVE_USERS,
    RETRIEVE_USERS_BY_TITLE
} from '../actions/types'

const initialState:any = [];
function userReducer(users = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_USER:
      return users.filter((id:Number) => id === payload.id);
    case RETRIEVE_USERS:
      return payload;
    case RETRIEVE_USERS_BY_TITLE:
      return users.filter((title:any) => title === payload.username||payload.name);;
    default:
      return users;
  }
};
export default userReducer;