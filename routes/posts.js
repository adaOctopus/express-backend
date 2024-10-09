import express from 'express';
import { getPost, getPosts, updatePost, createPost, deletePost } from '../controllers/postControllers.js';
const router = express.Router();


router.get('/', getPosts)
// Get unique posts
router.get('/:id', getPost)
// Create a post
router.post('/', createPost)
// Update
router.put('/:id', updatePost)
// Delete Post
router.delete('/:id', deletePost)


export default router;