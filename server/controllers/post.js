import User from '../models/User.js'
import Post from '../models/Post.js'

const postController = {
    // GET ALL POSTS
    getAllPosts : async (req, res) => {
        try {
            const posts = await Post.find().populate('user', ['fullName', 'displayName', 'avatar'])
                                           .populate('comments.user', ['displayName'])
            res.status(200).json({
                success: true,
                message: 'Get all posts successfully',
                posts
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    // GET POSTS USER
    getPostsUser : async (req, res) => {
        try {
            const posts = await Post.find({ user: { _id: req.params.userId } })

            res.status(200).json({
                success: true,
                message: 'Get posts user successfully',
                posts
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    // GET POST
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate('heartList', ['displayName', 'fullName', 'avatar'])
            
            res.status(200).json({
                success: true,
                message: 'Get post successfully',
                post
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    // HEART POST
    heartPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.postId)
            const user = post.heartList.find(x => x == req.body.userId)

            if(user) {
                await post.updateOne({ $pull: { heartList: req.body.userId } })
            }
            else {
                await post.updateOne({ $push: { heartList: req.body.userId } })
            }

            res.status(200).json({
                success: true,
                message: 'Heart post successfully!'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    // COMMENT POST
    commentPost: async (req, res) => {
        try {

            // C1: có thể trả về dữ liệu mới
            const updatedPost = await Post.findByIdAndUpdate({ _id: req.params.postId },{ $push: { comments: req.body } }, { new: true } )

            // C2:
            // const post = await Post.findById(req.params.postId)
            // await post.updateOne({ $push: { comments: req.body } })

            res.status(200).json({
                success: true,
                message: 'Add comment successfully!',
                post: updatedPost,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },

    // ADD POST
    addPost: async (req, res) => {
        const data = req.body
        
        try {
            const user = await User.findById(req.params.id)

            const newPost = new Post({
                ...data,
                user: user._id
            })

            const savedPost = await newPost.save()

            await user.updateOne({ $push: { posts: savedPost._id } })

            const addPost = await Post.findById(savedPost._id).populate('user', ['displayName', 'fullName'])
            
            res.status(200).json({
                success: true,
                message: 'Add post successfully!',
                post: addPost
             })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },

    // DELETE POST
    deletePost: async (req, res) => {
        try {
            await Post.findByIdAndDelete(req.params.id)

            await User.updateMany(
                { posts: req.params.id },
                { $pull: { posts: req.params.id } }
            )

            res.status(200).json({
                success: true,
                message: 'Delete post successfully!',
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
}

export default postController