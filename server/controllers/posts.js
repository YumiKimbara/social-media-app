// routesフォルダ内のroutesのlogicは全てcontrollersフォルダ内に記載する。
// リクエストが送信された場合、Expressルーターはこの関数を呼び出してレスポンスを生成。

import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    // 非同期処理でpostをgetしたいのでasync awaitを使用する。
    // データベースから投稿メッセージを検索。
    const postMessage = await PostMessage.find();
    // 200のステータスコードで PostMessage を含むJSONレスポンスを返す。
    res.status(200).json(PostMessage);
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
