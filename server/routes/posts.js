import express from "express";

// Reactでは語尾のjsを省略できるが、nodeでは省略しないように
import { getPosts, createPost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);

export default router;
