import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    urlImage : {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    heartList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
       {
           user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
           },
           content: {
               type: String,
               required: true
           },
           time: {
               type: Date,
               default: Date.now
           }
       }
    ]
})

const Post = mongoose.model('Post', postSchema)

export default Post