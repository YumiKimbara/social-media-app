import express from "express";

// Reactでは語尾のjsを省略できるが、nodeでは省略しないように
import { getPosts } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);

export default router;
