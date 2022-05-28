import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post', 
    initialState: {
        isFetching: false,
        posts: [],
    },
    reducers: {
        // GET ALL POST
        getPostsStart: state => {
            state.isFetching = true
        },
        getPostsSuccess: (state, action) => {
            state.isFetching = false
            state.posts = action.payload
        },

        // ADD POST
        addPostt: (state, action) => {
            state.posts.push(action.payload)
        },

        // HEART POST
        heartPost: (state, action) => {
            const { userId, postId } = action.payload

            let postHeart = state.posts.find(post => post._id === postId)
            const isHeart = postHeart.heartList.some(item => item === userId)

            if(isHeart) {
                let heartList = postHeart.heartList
                heartList = heartList.filter(item => item !== userId)
                
                postHeart = { ...postHeart, heartList }
            }          
            else {  
                postHeart.heartList.push(userId)
            }

            state.posts = state.posts.map(post => {
                if(post._id === postId) {
                    return postHeart
                }
                return post
            })
        },

        // COMMENT POST
        commentPostt: (state, action) => {
            const { _id, comments } = action.payload
            console.log(comments);

            const postIsFind = state.posts.find(post => post._id === _id)
            
            postIsFind.comments.push(comments[comments.length - 1])

            state.posts = state.posts.map(post => {
                if(post._id === _id) {
                    return postIsFind
                }
                return post
            })
        },

    }
})

export const { getPostsStart, getPostsSuccess, addPostt, heartPost, commentPostt } = postSlice.actions
export default postSlice.reducer