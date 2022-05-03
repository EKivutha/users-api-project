import { combineReducers } from "redux";
import users from "./users";
import posts from "./post"
export default combineReducers({
  users,
  posts,
});