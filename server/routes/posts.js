import express from 'express';
import { getPosts, createPost, editPost, deletePost, likePost } from "../controllers/posts.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.put('/:id', auth, editPost);
router.delete('/:id', auth, deletePost);
router.put('/:id/like', auth, likePost);

export default router;
