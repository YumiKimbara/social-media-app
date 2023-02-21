import { combineReducers } from "redux";
import posts from "./posts";

// combineReducers関数は、複数のreducerを受け取り、単一のreducerを返すことで状態を管理する。
export default combineReducers({
  posts,
});
