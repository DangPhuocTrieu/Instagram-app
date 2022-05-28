import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
    },
    phoneNumber : {
        type: String,
    },
    sex : {
        type: String,
        enum: ['Nam', "Nữ"],
    },
    avatar: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isFollow: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
})

const User = mongoose.model('User', userSchema)

export default User