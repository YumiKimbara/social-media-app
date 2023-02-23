import axios from "axios";

const url = "http://localhost:3333/posts";

// urlに対してHTTP GETリクエストを送信し、APIから投稿データを取得する。
export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

// どの投稿をupdateしたいか判断するため、idも渡す。
export const updatePost = (id, updatedPost) => {
  console.log("id, updatedPost", id, updatedPost);
  axios.patch(`${url}/${id}`, updatedPost);
};

export const deletePost = (id) => {
  axios.delete(`${url}/${id}`);
};

export const likePost = (id) => {
  axios.patch(`${url}/${id}/likePost`);
};
