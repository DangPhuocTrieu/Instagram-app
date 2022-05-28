import express from 'express'
import postController from '../controllers/post.js'
import { verifyToken, verifyTokenAndAdmin } from '../middleware/auth.js'

const router = express.Router()

// GET ALL POSTS
router.get('/', verifyToken, postController.getAllPosts)

// GET POSTS USER
router.get('/user/:userId', verifyToken, postController.getPostsUser)

// GET POST
router.get('/:id', verifyToken, postController.getPost)

// HEART POST
router.post('/heart/:postId', verifyToken, postController.heartPost)

// COMMENT POST
router.post('/comment/:postId', verifyToken, postController.commentPost)

// ADD POST
router.post('/:id', verifyToken, postController.addPost)

// DELETE POST
router.delete('/:id', verifyToken, verifyTokenAndAdmin, postController.deletePost)

export default router