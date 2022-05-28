import { useState } from 'react'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { FaRegHeart } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { RiAddCircleLine, RiMessengerLine, RiSaveLine } from 'react-icons/ri'
import { RiRoadMapLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import logo_insta from '../../assets/images/logo_insta.png'
import user_avt from '../../assets/images/user_avt.jpg'
import { handleDisabledScroll, handleEnableScroll } from '../../services'
import AddPost from '../AddPost'
import './style.scss'

function Header() {
    const user = useSelector(state => state.auth.login.currentUser)

    const navigate = useNavigate()
    
    const [showOption, setShowOption] = useState(false)
    const [showModalAddPost, setShowModalAddPost] = useState(false)
    
    const handleShowOption = () => {
        setShowOption(state => !state)
    }

    const handleShowModalAddPost = () => {
        setShowModalAddPost(true)
        handleDisabledScroll()  
    }

    const handleNavigateUserDetail = () => {
        navigate(
            `/${user.displayName}`,
            { state: { id: user._id } }
        )

        setShowOption(false)
    }

    const handleNavigateUserPostSave = () => {
        navigate(`/${user.displayName}/saved`)

        setShowOption(false)
    } 

    const handleNavigateSetting = () => {
        navigate('/accouts/edit')
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }


    return ( 
        <div className="header">
           <div className="header__main container">
                <Link to='/' className="header__logo">
                    <img src={logo_insta} alt="logo" />
                </Link>
                <div className="header__search">
                    <AiOutlineSearch className="header__search-icon" />
                    <input type="text" className="header__search-input" placeholder="Tìm kiếm" />
                </div>
                <div className="header__action">
                    <NavLink to='/' className='header__action-link'>
                        <AiOutlineHome />
                    </NavLink>
                    <NavLink to='/direct/inbox' className='header__action-link'>
                        <RiMessengerLine />
                    </NavLink>
                    <div className='header__action-link' onClick={handleShowModalAddPost}>
                        <RiAddCircleLine />
                    </div>
                    <NavLink to='/explore' className='header__action-link'>
                        <RiRoadMapLine />
                    </NavLink>
                    <div className='header__action-link'>
                        <FaRegHeart />
                    </div>
                    <div className='header__action-link'>
                        <img 
                            src={user?.avatar ? user.avatar : user_avt} 
                            alt="avatar" 
                            className='header__action-avatar' 
                            onClick={handleShowOption}
                        />
                        <div className={`header__action-menu ${showOption ? 'header__action-menu--active' : ''}`}>
                            <ul>
                                <li onClick={handleNavigateUserDetail}>
                                    <BiUserCircle />
                                    <p>Trang cá nhân</p>
                                </li>
                                <li onClick={handleNavigateUserPostSave}>
                                    <RiSaveLine />
                                    <p>Đã lưu</p>
                                </li>
                                <li onClick={handleNavigateSetting}>
                                    <FiSettings />
                                    <p>Cài đặt</p>
                                </li>
                            </ul>
                            <div className='header__action-logout' onClick={handleLogout}>Đăng xuất</div>
                        </div>
                    </div>
                </div>

                {
                    showModalAddPost && (
                        <AddPost showModal={setShowModalAddPost} />
                    )
                    
                }
           </div>
        </div>
     );
}

export default Header;