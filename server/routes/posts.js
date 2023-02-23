import express from "express";

// Reactでは語尾のjsを省略できるが、nodeでは省略しないように
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

// ルーティングを定義するメソッドを作成
// 新しいRouterオブジェクトを返します。これを使うことで、ルーターインスタンスを作成し、ルーティングを定義することができます。
const router = express.Router();

// GETリクエストを処理するためのルートを定義
// 第1引数には、ルートURLを指定します
// 第2引数には、ルートが受け取ったリクエストを処理するコールバック関数が指定されます。
// つまり、このルートは、アプリケーションのルートURL（/）にGETリクエストが送信された場合に、getPosts関数が呼び出される
router.get("/", getPosts);
router.post("/", createPost);
// updateのときはどのpostかわかるようにid必要
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
