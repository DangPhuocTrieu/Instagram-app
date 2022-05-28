import axios from 'axios'
import { loginFail, loginStart, loginSuccess, registerFail, registerStart, registerSuccess } from './authSlice'
import { getPostsStart, getPostsSuccess } from './postSlice'

const BASE_URL = 'http://localhost:5000/api'


// USER

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())

    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, user)

        if(response.data.success) {
            dispatch(loginSuccess(response.data.user))
            navigate('/')
        }
        
        return response.data
    } catch (error) {
        dispatch(loginFail())
        return error.response.data
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())

    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, user)
        
        if(response.data.success) {
            dispatch(registerSuccess())
            navigate('/login')
        }

        return response.data
    } catch (error) {
        dispatch(registerFail())
        return error.response.data
    }
}

export const getAllUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user`)       
        return response.data
    } catch (error) {}
}

export const getUser = async id => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}`)       
        return response.data
    } catch (error) {}
}

export const followUser = async (accessToken, userId, userIdFollow) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/follow/${userId}`, { id: userIdFollow }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })       
        return response.data
    } catch (error) {}
}

export const removeFollowerUser = async (accessToken, userId, userIdRemove) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/delFollower/${userId}`, { id: userIdRemove }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })       
        return response.data
    } catch (error) {}
}

export const updateAvatarUser = async (accessToken, userId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/user/avatar/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })       
        return response.data
    } catch (error) {}
}



// POST

export const getAllPosts = async (accessToken, dispatch) => {
    dispatch(getPostsStart())

    try {
        const response = await axios.get(`${BASE_URL}/post`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        
        dispatch(getPostsSuccess(response.data.posts)) 
    } catch (error) {}
} 

export const getPostsUser = async (accessToken, userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/post/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        
        return response.data
    } catch (error) {}
}

export const getPost = async (accessToken, postId) => {
    try {
        const response = await axios.get(`${BASE_URL}/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        
        return response.data
    } catch (error) {}
}

export const addPost = async(accessToken, userId, data) => {
    try {
        const response = await axios.post(`${BASE_URL}/post/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {}
}

export const dropHeartPost = async(accessToken, postId, userId) => {
    try {
        const response = await axios.post(`${BASE_URL}/post/heart/${postId}`, userId, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        
        return response.data
    } catch (error) {}
}

export const commentPost = async(accessToken, postId, userId) => {
    try {
        const response = await axios.post(`${BASE_URL}/post/comment/${postId}`, userId, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {}
}

export const uploadImage = async(data) => {
    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/ddwurilrw/image/upload', {
            method: 'POST',
            body: data
        })
        
        return response.json()
    } catch (error) {
        return error.message
    }
}

