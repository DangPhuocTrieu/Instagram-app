import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import postReducer from './postSlice'
import userReducer from './userSlice'


export default configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        user: userReducer
    }
})