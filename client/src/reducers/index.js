import { combineReducers } from "redux";
// import { postsReducer } from "./posts";
import posts from "./posts";
import auth from "./auth";

// combineReducers関数は、複数のreducerを受け取り、単一のreducerを返すことで状態を管理する。
export default combineReducers({
  // postsReducer,
  posts,
  auth,
});
