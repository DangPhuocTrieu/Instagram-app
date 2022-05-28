import User from '../models/User.js'

const userController = {

    // GET ALL USERS
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find()
            
            res.status(200).json({ 
                success: true, 
                message: 'Get all user successfully!', 
                users 
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },


    // HANDLE FOLLOW USER
    followUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            const userWantFollow = await User.findById(req.body.id)

            const isFollow = userWantFollow.followers.some(x => x == req.params.id)

            if(isFollow) {
                await user.updateOne({ $pull: { isFollow: userWantFollow._id } })
                await userWantFollow.updateOne({ $pull: { followers: req.params.id } })
            }
            else {
                await user.updateOne({ $push: { isFollow: userWantFollow._id  } })
                await userWantFollow.updateOne({ $push: { followers: req.params.id } })
            }

            res.status(200).json({
                success: true,
                message: 'Follow user successfully!',
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },

    // HANDLE REMOVE FOLLOWER USER
    removeFollowerUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            const userRemove = await User.findById(req.body.id)

            if(userRemove) {
                await user.updateOne({ $pull: { followers: userRemove._id } })
                await userRemove.updateOne({ $pull: { isFollow: req.params.id } })
            }

            res.status(200).json({
                success: true,
                message: 'Remove follower user successfully!',
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },

    // GET USER
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('posts')
                        .populate('followers', ['_id', 'avatar', 'displayName', 'fullName'])
                        .populate('isFollow', ['_id', 'avatar', 'displayName', 'fullName'])
                        
            const { password, ...others } = user._doc

            res.status(200).json({
                success: true,
                message: 'Get user successfully!',
                user: others
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    
    // DELETE USER
    deleteUser: async(req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            
            res.status(200).json({ 
                success: true, 
                message: 'Deleted successfully!',
             })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    // UPDATE AVATAR USER
    updateAvatar: async (req, res) => {
        try {
            const userUpdated = await User.findOneAndUpdate(
                { _id: req.params.id },
                { avatar: req.body.imageUrl },
                { new: true }
            )

            res.status(200).json({
                success: true,
                user: userUpdated,
                message: 'Update avatar successfully'
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
        
    }
}

export default userController