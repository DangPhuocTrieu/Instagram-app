import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            isFetching: false,
            currentUser: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
        },
        register: {
            isFetching: false,
            success: false
        }
    },
    reducers: {
        loginStart: state => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
        },
        loginFail: state => {
            state.login.isFetching = false
        },
        registerStart: state => {
            state.register.isFetching = true
        },
        registerSuccess: state => {
            state.register.isFetching = false
            state.register.success = true
        },
        registerFail: state => {
            state.register.isFetching = false
            state.register.success = false
        },
        updateAvatarUserLogin: (state, action) => {
            state.login.currentUser = {...state.login.currentUser, avatar: action.payload}
        }
    }
})

export const { loginStart, loginSuccess, loginFail, registerStart, registerSuccess, registerFail, updateAvatarUserLogin } = authSlice.actions
export default authSlice.reducer