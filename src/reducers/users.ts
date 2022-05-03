import {
    RETRIEVE_USER,
    RETRIEVE_USERS,
    UPDATE_USER,
    RETRIEVE_USERS_BY_TITLE
} from '../actions/types'

const initialState:any = [];
function userReducer(users = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_USER:
      return payload;
    case RETRIEVE_USERS:
      return payload;
      case UPDATE_USER:
        return users.map((user:any) => {
          if (user.id === payload.id) {
            return {
              ...user,
              ...payload,
            };
          } else {
            return user;
          }
        });
    case RETRIEVE_USERS_BY_TITLE:
      return payload;
    default:
      return users;
  }
};
export default userReducer;