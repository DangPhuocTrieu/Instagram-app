import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import user_avt from '../../assets/images/user_avt.jpg'
import { followUser, getAllUser, getUser } from '../../redux/apiRequest'
import Loading from '../Loading'
import './style.scss'

function User() {
    const navigate = useNavigate()

    const user = useSelector(state => state.auth.login.currentUser)

    const [userSuggests, setUserSuggests] = useState([])
    const [status, setStatus] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ( async () => {
            const { users } = await getAllUser()

            const data = await getUser(user._id)
            
            const userList = users.filter(item => {
                if(data.user._id !== item._id) {
                    const isFollow = data.user.isFollow.find(x => x._id === item._id )
                    if(!isFollow) return item
                }
            })
            
            setUserSuggests(userList)
            setLoading(false)
        })()
    }, [])

    const handleNavigateUserDetail = () => {
        navigate(
            `/${user.displayName}`,
            { state: { id: user._id } }
        )
    }

    const handleFollowUser = async (userIdFollow) => {
        await followUser( user.accessToken, user._id, userIdFollow )
        
        setStatus(state => {
            const isExist = state.find(item => item === userIdFollow)

            if(isExist) {
                return state.filter(x => x !== userIdFollow)
            }

            return [...state, userIdFollow]
        })

    }

    return ( 
        <div className="user">
            <div className="user__main">
                <div className="user__info">
                    <div 
                        onClick={handleNavigateUserDetail}
                        className="user__avatar"
                    >
                        <img src={user?.avatar ? user.avatar : user_avt} alt="avatar" />
                    </div>

                    <div className="user__name">
                        <div 
                            onClick={handleNavigateUserDetail}
                            className="user__name-display"
                            >
                                {user.displayName}
                        </div>
                        <span className="user__name-full">{user.fullName}</span>
                    </div>
                    <div className="user__transfer">Chuyển</div>
                </div>

                <div className="user__suggest">
                    <div className="user__suggest-top">
                        <p>Gợi ý cho bạn</p>
                        <button>Xem tất cả</button>
                    </div>
                    <ul className="user__suggest-list">
                        {
                            !loading ? (
                                userSuggests.map(user => (
                                    <li className="user__suggest-item" key={user._id}>
                                        <img src={user.avatar ? user.avatar : user_avt} alt="avatar" className='user__suggest-avatar' />
                                        <div className="user__suggest-name">
                                            <h5>{user.displayName}</h5>
                                            <span>{user.fullName}</span>
                                        </div>
                                        <button className='user__suggest-follow' onClick={() => handleFollowUser(user._id)}>
                                            {
                                                status.find(item => item === user._id) ? (
                                                    <p>Đang theo dõi</p>
                                                ) : (
                                                    <span>Theo dõi</span>
                                                )
                                            }
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <Loading />
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
     );
}

export default User;