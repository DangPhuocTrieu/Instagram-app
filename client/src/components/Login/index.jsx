import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiFillFacebook } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import appStore from '../../assets/images/appStore.png'
import googlePlay from '../../assets/images/googlePlay.png'
import logo_insta from '../../assets/images/logo_insta.png'
import { loginUser } from '../../redux/apiRequest'
import './style.scss'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loading = useSelector(state => state.auth.login.isFetching)
    const user = JSON.parse(localStorage.getItem('user'))

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    if(user) {
        return <Navigate to='/' />
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const newUser = { nameLogin: username, password }
        
        const data = await loginUser(newUser, dispatch, navigate)
        
        data.success ? localStorage.setItem('user', JSON.stringify(data.user)) : setMessage(data.message)
    }

    return ( 
        <div className="login">
            <div className="login__main container">
                <form className="login__form" onSubmit={handleSubmit}>
                    <img className="login__logo" src={logo_insta} alt="logo" />
                    <div className="login__inputs">
                        <input value={username} onChange={e => setUsername(e.target.value)} className="login__username" placeholder='Số điện thoai, tên người dùng hoặc email' />
                        <div className="login__inputs-wrap">
                            <input value={password} onChange={e => setPassword(e.target.value)}  className="login__password" type='password' placeholder='Mật khẩu' />
                            <AiFillEye className='login__inputs-eye' />
                            <AiFillEyeInvisible className='login__inputs-eye' />
                        </div>
                    </div>
                    <button className={`login__submit ${(username && password )? 'login__submit--active' : ''}`} type='submit'>
                        { loading ? '. . .': 'Đăng nhập' }
                    </button>
                    <span className='login__or'>Hoặc</span>
                    <div className="login__facebook">
                        <AiFillFacebook className="login__facebook-icon" />
                        <p className="login__facebook-text">Đăng nhập bằng Facebook</p>
                    </div>
                    <p className="message">{message}</p>
                    <Link to='/forget-password'>
                        <span className="login__forget">Quên mật khẩu?</span>
                    </Link>
                </form>
                <div className="login__register">
                    <p className="login__register-text">Bạn chưa có tài khoản ư?</p>
                    <Link to='/register' className='login__register-link'>Đăng ký</Link>
                </div>
                <div className="login__app">
                    <span className="login__app-text">Tải ứng dụng</span>
                    <div className="login__app-image">
                        <img src={appStore} alt="app store" />
                        <img src={googlePlay} alt="google play" />
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Login;