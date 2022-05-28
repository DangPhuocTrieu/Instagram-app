import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: false,
        user: null,
        userFollow: null,
    },
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload
            
            state.userFollow = {
                _id: action.payload._id,
                followers: action.payload.followers,
                isFollow: action.payload.isFollow
            }
        },

        followUserr: (state, action) => {
            const isExsist = state.userFollow.isFollow.find(item => item._id === action.payload._id)

            if(isExsist) {
                const isFollow = state.userFollow.isFollow.filter(item => item._id !== action.payload._id)
                state.userFollow = {...state.userFollow, isFollow}
            }
            else {
                state.userFollow.isFollow.push(action.payload)
            }

            return state
        },

        removeFollowerUserr: (state, action) => {
            let followers = [...state.userFollow.followers]
            followers = followers.filter(item => item._id !== action.payload)

            state.userFollow = {...state.userFollow, followers}
        },
        
        updateAvatarUserr: (state, action) => {
            state.user = {... state.user, avatar: action.payload}
        } 
    }
})

export const { saveUser, followUserr, updateAvatarUserr, removeFollowerUserr } = userSlice.actions
export default userSlice.reducer