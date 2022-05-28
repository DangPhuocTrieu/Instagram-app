import { useEffect, useState } from "react";
import { AiOutlineTags } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineGridOn } from 'react-icons/md';
import { RiSaveLine, RiSettingsLine } from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import user_avt from '../../assets/images/user_avt.jpg';
import Loading from "../../components/Loading";
import { followUser, getUser, removeFollowerUser, updateAvatarUser, uploadImage } from "../../redux/apiRequest";
import { saveUser, followUserr, updateAvatarUserr, removeFollowerUserr } from "../../redux/userSlice";
import { handleDisabledScroll, handleEnableScroll } from '../../services';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import { updateAvatarUserLogin } from "../../redux/authSlice";

function UserDetail() {
    const { state } = useLocation()
    const dispatch = useDispatch()

    let id = null
    state ? id = state.id : id = JSON.parse(localStorage.getItem('user'))._id
    
    const user = useSelector(state => state.user.user)
    const userFollow = useSelector(state => state.user.userFollow)

    const accessToken = JSON.parse(localStorage.getItem('user')).accessToken

    const [loading, setLoading] = useState(true)
    const [loadingAvt, setLoadingAvt] = useState(false)
    const [showIsFollowModal, setShowIsFollowModal] = useState(false)
    const [showFollowerModal, setShowFollowerModal] = useState(false)

    const [followerList, setFollowerList] = useState([])
    const [followingList, setFollowingList] = useState([])
    
    useEffect(() => {
        (async () => {
            const data = await getUser(id)
            dispatch(saveUser(data.user))

            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleShowIsFollowModal = () => {
        setShowIsFollowModal(true)
        handleDisabledScroll()
    }       

    const handleCloseIsFollowModal = () => {
        setShowIsFollowModal(false)
        handleEnableScroll()
    }

    const handleShowFollowerModal = () => {
        setShowFollowerModal(true)
        handleDisabledScroll()
    }       

    const handleCloseFollowerModal = () => {
        setShowFollowerModal(false)
        handleEnableScroll()
    }

    const handleRemoveFollowerUser = async userIdRemove => {
        await removeFollowerUser(accessToken, user._id, userIdRemove)

        dispatch(removeFollowerUserr(userIdRemove))

        setFollowerList(state => {
            const isExsist = state.find(item => item === userIdRemove)

            if(!isExsist) {
                return [...state, userIdRemove]
            }
        })
    }

    const handleFollowUser = async userWantFollow => {

        const userIdFollow = userWantFollow._id

        await followUser(accessToken, user._id, userIdFollow)

        dispatch(followUserr(userWantFollow))

        setFollowingList(state => {
            const isExsist = state.find(item => item === userIdFollow)

            if(!isExsist) {
                return [...state, userIdFollow]
            }
            
            return state.filter(item => item !== userIdFollow)
        })
    }

    const hanldeImageChange = async e => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('upload_preset', 'instagramimages')

        setLoadingAvt(true)

        const file = await uploadImage(formData)

        const data = await updateAvatarUser(accessToken, user._id, { imageUrl: file.secure_url })

        setLoadingAvt(false)

        dispatch(updateAvatarUserr(data.user.avatar))
        dispatch(updateAvatarUserLogin(data.user.avatar))

        toast.success('Cập nhật ảnh đại diện thành công!')
    }


    return ( 
        !loading ? (
            <div className="detail">
                <div className="detail__main container">
                    <ToastContainer />
                    <div className="detail__top">
                        <label className="detail__avatar" id='avatar'>
                            <input type='file' id="avatar" onChange={hanldeImageChange} />
                            {
                                !loadingAvt ? (
                                    <img src={user.avatar ? user.avatar : user_avt} alt="avatar" />
                                ) : (
                                    <Loading />
                                )
                            }
                        </label>
                        <div className="detail__info">
                            <div className="detail__info-top">
                                <h2 className="detail__info-displayname">{user.displayName}</h2>
                                <Link to='/accounts/edit' className="detail__info-edit">
                                    <p>Chỉnh sửa trang cá nhân</p>
                                </Link>
                                <div className="detail__info-option">
                                    <RiSettingsLine />
                                </div>
                            </div>
                            <div className="detail__info-mid">
                                <div className="detail__info-posts detail__info-general">
                                    <span>{user.posts.length}</span> bài viết
                                </div>

                                <div className="detail__info-isfollow detail__info-general">
                                    <div onClick={handleShowFollowerModal}>
                                        <span>{userFollow.followers.length}</span> người theo dõi
                                    </div>

                                    <div 
                                        className={`detail__info-isfollow-overlay ${showFollowerModal ? 'detail__info-isfollow-overlay--actived' : ''}`}
                                        style={{ height: `${window.scrollY + window.innerHeight - 1}px` }}
                                        >
                                    </div>
                                    <div className={`detail__info-isfollow-modal ${showFollowerModal ? 'detail__info-isfollow-modal--actived' : ''}`}>
                                        <div className="detail__info-isfollow-top">
                                                <span>Đang theo dõi</span>
                                                <IoMdClose onClick={handleCloseFollowerModal} />
                                        </div>
                                        <ul className="detail__info-isfollow-list">
                                            {
                                                user.followers.length > 0 ? (
                                                    user.followers.map(user => (
                                                        <li className="detail__info-isfollow-item" key={user._id}>
                                                            <img src={user.avatar ? user.avatar : user_avt} alt="" />
                                                            <div className="detail__info-isfollow-name">
                                                                <h5>{user.displayName}</h5>
                                                                <span>{user.fullName}</span>
                                                            </div>
                                                            <button 
                                                                onClick={() => handleRemoveFollowerUser(user._id)} 
                                                            >
                                                                {
                                                                    followerList.find(item => item === user._id) ? (
                                                                        <span>Đã xóa</span>
                                                                    ) : (
                                                                        <b>Xóa</b>
                                                                    )
                                                                }
                                                            </button>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p>Hổng có ai theo dõi hết trơn :((</p>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>

                                <div className="detail__info-following detail__info-general">
                                   <div onClick={handleShowIsFollowModal}>
                                        Đang theo dõi <span>{userFollow.isFollow.length}</span> người dùng
                                   </div>

                                    <div 
                                        className={`detail__info-following-overlay ${showIsFollowModal ? 'detail__info-following-overlay--actived' : ''}`}
                                        style={{ height: `${window.scrollY + window.innerHeight - 1}px` }}
                                        >
                                   </div>
                                    <div className={`detail__info-following-modal ${showIsFollowModal ? 'detail__info-following-modal--actived' : ''}`}>
                                        <div className="detail__info-following-top">
                                                <span>Đang theo dõi</span>
                                                <IoMdClose onClick={handleCloseIsFollowModal} />
                                        </div>
                                        <ul className="detail__info-following-list">
                                            {
                                                user.isFollow.length > 0 ? (
                                                    user.isFollow.map(user => (
                                                        <li className="detail__info-following-item" key={user._id}>
                                                            <img src={user.avatar ? user.avatar : user_avt} alt="" />
                                                            <div className="detail__info-following-name">
                                                                <h5>{user.displayName}</h5>
                                                                <span>{user.fullName}</span>
                                                            </div>
                                                            <button onClick={() => handleFollowUser(user)}>
                                                                {
                                                                    followingList.find(item => item === user._id) ? (
                                                                        <span>Theo dõi</span>
                                                                    ) : (
                                                                        <b>Đang theo dõi</b>
                                                                    )
                                                                }
                                                            </button>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p>Hổng thèm theo dõi ai hết nha :v</p>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="detail__info-fullname">{user.fullName}</p>
                        </div>
                    </div>
                    <div className="detail__bottom">
                        <div className="detail__bottom-link">
                            <NavLink to={`/${user.displayName}`} className={({isActive}) => isActive ? 'detail__bottom-active' : '' } end>
                                <MdOutlineGridOn />
                                <span>Bài viết</span>
                            </NavLink>
                            <NavLink to='saved' className={({isActive}) => isActive ? 'detail__bottom-active' : '' }>
                                <RiSaveLine />
                                <span>Đã lưu </span>
                            </NavLink>
                            <NavLink to='tagged' className={({isActive}) => isActive ? 'detail__bottom-active' : '' }>
                                <AiOutlineTags />
                                <span>Được gắn thẻ</span>
                            </NavLink>
                        </div>

                        <Outlet />
                    </div>
                </div>
            </div>
        ) : (
            <Loading />
        )
     );
}

export default UserDetail;