import axios from "axios";

const url = "http://localhost:3333/posts";

// urlに対してHTTP GETリクエストを送信し、APIから投稿データを取得する。
export const fetchPosts = () => axios.get(url);
