// routesフォルダ内のroutesのlogicは全てcontrollersフォルダ内に記載する。

import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    // 非同期処理でpostをgetしたいのでasync awaitを使用する。
    const postMessage = await PostMessage.find();
    res.status(200).json(PostMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    // 201はcreationが成功したということ。
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
