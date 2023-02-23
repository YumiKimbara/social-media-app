import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case CREATE:
      // 全てのポストと新しいポストを一緒に返す。
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) =>
        // 現在のPostのid(post._id)と新しいPostのid(ction.payload._id)が一緒なら新しいPostを返す
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
