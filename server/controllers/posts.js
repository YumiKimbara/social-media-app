// routesフォルダ内のroutesのlogicは全てcontrollersフォルダ内に記載する。
// リクエストが送信された場合、Expressルーターはこの関数を呼び出してレスポンスを生成。

import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    // 非同期処理でpostをgetしたいのでasync awaitを使用する。
    // データベースから投稿メッセージを検索。
    const postMessage = await PostMessage.find();
    // 200のステータスコードで PostMessage を含むJSONレスポンスを返す。
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  // HTTPリクエストボディからパースされたJSONオブジェクトで、この場合、投稿メッセージのデータを含んでいます。
  const post = req.body;

  // PostMessage のモデルインスタンスを作成
  const newPost = new PostMessage(post);

  try {
    // データベースに新しい投稿メッセージを保存
    await newPost.save();

    // 201はcreationが成功したということ。
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  // idはroutesフォルダのidから来ている。
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  // updateされたpostの内容
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post  deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  // postをlikeしたuserのIdとauthのIdが一致するか確認
  const index = post.likes.findIndex((id) => id === String(req.userId));

  // -1はfalseの場合
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
