import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3333" });

// 下記のAPIリクエスト前に記載する。
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// urlに対してHTTP GETリクエストを送信し、APIから投稿データを取得する。
export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

// どの投稿をupdateしたいか判断するため、idも渡す。
export const updatePost = (id, updatedPost) => {
  console.log("id, updatedPost", id, updatedPost);
  API.patch(`$/posts/${id}`, updatedPost);
};

export const deletePost = (id) => {
  API.delete(`posts/${id}`);
};

export const likePost = (id) => {
  API.patch(`posts/${id}/likePost`);
};

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
