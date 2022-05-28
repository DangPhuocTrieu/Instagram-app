import { useState } from 'react'
import { AiFillFacebook } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import appStore from '../../assets/images/appStore.png'
import googlePlay from '../../assets/images/googlePlay.png'
import logo_insta from '../../assets/images/logo_insta.png'
import { registerUser } from '../../redux/apiRequest'
import './style.scss'

function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loading = useSelector(state => state.auth.login.isFetching)

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        const newUser = { nameRegister: username, fullName, displayName, password }

        const data = await registerUser(newUser, dispatch, navigate)
        if(!data.success) setMessage(data.message)
    }

    return ( 
        <div className="register">
            <div className="register__main container">
                <form className="register__form" onSubmit={handleSubmit}>
                    <img className="register__logo" src={logo_insta} alt="logo" />
                    <h3 className="register__sologan">Đăng ký để xem ảnh và video từ bạn bè.</h3>
                    <div className="register__facebook">
                        <AiFillFacebook className="register__facebook-icon" />
                        <p className="register__facebook-text">Đăng nhập bằng Facebook</p>
                    </div>
                    <span className='register__or'>Hoặc</span>
                    <div className="register__inputs">
                        <input onChange={e => setUsername(e.target.value)} className="register__username" placeholder='Số điện thoai hoặc email' />
                        <input onChange={e => setFullName(e.target.value)} className="register__fullname"  placeholder='Tên đầy đủ' />
                        <input onChange={e => setDisplayName(e.target.value)} className="register__displayname"  placeholder='Tên người dùng' />
                        <input onChange={e => setPassword(e.target.value)} className="register__fullname" type='password'  placeholder='Mật khẩu' />
                    </div>
                    <button className={`register__submit 
                        ${(username && fullName && displayName && password) ? 'register__submit--active' : ''}`}
                    >
                        { loading ? 'Loading...' : 'Đăng ký' }
                    </button>
                    <p className="message">{message}</p>
                    <p className="register__rule">
                        Bằng cách đăng ký, bạn đồng ý với 
                        <Link to='/'> Điều khoản, Chính sách dữ liệu</Link> và
                        <Link to='/'> Chính sách cookie</Link> của chúng tôi
                    </p>
                </form>
                <div className="register__login">
                    <p className="register__register-text">Bạn có tài khoản?</p>
                    <Link to='/login' className='register__register-link'>Đăng nhập</Link>
                </div>
                <div className="register__app">
                    <span className="register__app-text">Tải ứng dụng</span>
                    <div className="register__app-image">
                        <img src={appStore} alt="app store" />
                        <img src={googlePlay} alt="google play" />
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Register;