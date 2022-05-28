import express from 'express'
import userController from '../controllers/user.js'
import { verifyToken, verifyTokenAndAdmin } from '../middleware/auth.js'

const router = express.Router()

// GET ALL USER
router.get('/', userController.getAllUsers)

// GET USER
router.get('/:id', userController.getUser)

// HANDLE FOLLOW USER
router.post('/follow/:id', userController.followUser)

// HANDLE FOLLOWER USER
router.post('/delFollower/:id', userController.removeFollowerUser)

// UPDATE AVATAR USER
router.put('/avatar/:id', userController.updateAvatar)

// DELETE USER
router.delete('/:id', verifyToken, verifyTokenAndAdmin, userController.deleteUser)

export default router