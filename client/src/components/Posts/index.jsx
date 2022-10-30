import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMessageRounded } from 'react-icons/bi';
import { BsSave, BsThreeDots } from 'react-icons/bs';
import { FaHeart, FaRegHeart, FaRegPaperPlane, FaRegSmile } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import user_avt from '../../assets/images/user_avt.jpg';
import { commentPost, dropHeartPost, getAllPosts, getPost } from '../../redux/apiRequest';
import { commentPostt, heartPost } from '../../redux/postSlice';
import { handleDisabledScroll, handleEnableScroll } from '../../services';
import Loading from '../Loading';
import './style.scss';
 
function Posts() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.login.currentUser)

    const posts = useSelector(state => state.post.posts)

    const loading = useSelector(state => state.post.isFetching)

    const [commentValue, setCommentValue] = useState('')
    const [heartList, setHeartList] = useState([])
    const [heartModal, setHeartModal] = useState(false)
    const [currentHeight, setCurrentHeight] = useState(0)

    
    useEffect(() => {
       ( async () => {
            await getAllPosts(user.accessToken, dispatch)
       })()
    }, [])

    const handleIsHeart = post => {
       const isHeart = post.heartList.find(item => item === user._id)
       if(isHeart) return true
       return false
    }

    const handleDropHeart = async (postId) => {
       const userId = user._id

       await dropHeartPost(user.accessToken, postId, { userId })
       dispatch(heartPost({ postId, userId }))
    }

    const handleCommentPost = async (e, postId) => {
       const { post } = await commentPost(user.accessToken, postId, { user: user._id, content: commentValue })
       
       dispatch( commentPostt(post) )
       
       e.target.previousSibling.value = ''
       setCommentValue('')
    }

    const handleDisplayHeartList = async id => {
      const data = await getPost(user.accessToken, id)
      setHeartList(data.post.heartList)

      setHeartModal(true)
      setCurrentHeight(window.scrollY)

      handleDisabledScroll()
    }

    const handleCloseHeartModal = () => {
       setHeartModal(false)
       handleEnableScroll()
    }
 
    return ( 
        <div className='posts'>
            <div 
               className={`posts__overlay ${heartModal ? 'posts__overlay-active' : ''}`}
               style={{ height: `${currentHeight + window.innerHeight}px` }}
               >
            </div>
            {
               !loading ? (
                  posts.map(post => (
                     <div className="post" key={post._id}>
                        <div className="post__info">
                           <Link to='/' className='post__info-avatar'>
                              <img src={post.user?.avatar ? post.user.avatar : user_avt} alt="" />
                           </Link>
                           <div className="post__info-middle">
                              <Link to='/' className="post__info-name">
                                 <span>{post.user.displayName}</span>
                              </Link>
                              <p className="post__info-title">{post.title}</p>
                           </div>
                           <div className="post__info-option">
                              <BsThreeDots />
                           </div>
                        </div>
                        <div className="post__image">
                           <img src={post.urlImage} alt="image" />
                        </div>
                        <div className="post__wrap">
                           <div className="post__action">
                              <div className="post__action-left">
                                 {
                                    handleIsHeart(post) ? (
                                       <FaHeart className='post__action-active' onClick={() => handleDropHeart(post._id, 'heart')} />
                                    ) : (
                                       <FaRegHeart onClick={() => handleDropHeart(post._id, 'hearted')} />
                                    )  
                                 }
                                 <BiMessageRounded />
                                 <FaRegPaperPlane />
                              </div>
                              <div className="post__action-right">
                                 <BsSave />
                              </div>
                           </div>
                        </div>
                        <div className="post__wrap post__border">
                           <div className='post__heart'>
                              <span className='post__heart-total' onClick={() => handleDisplayHeartList(post._id)}>
                                 { post.heartList.length > 0 && `${post.heartList.length} lượt thích `}
                              </span>
                              {
                                 heartModal && (
                                    <div className="post__heart-modal" style={{top: `${(currentHeight + (window.innerHeight / 2))}px`}}>
                                       <div className="post__heart-top">
                                          <h5>Luợt thích</h5>
                                          <AiOutlineClose className='post__heart-close' onClick={handleCloseHeartModal} />
                                       </div>
                                       <div className="post__heart-list">
                                          {
                                             heartList.map(item => (
                                                <div className="post__heart-item" key={item._id}>
                                                   <img src={item.avatar ? item.avatar : user_avt} alt="avatar" className="post__heart-avt" />
                                                   <div className="post__heart-name">
                                                      <p>{item.displayName}</p>
                                                      <p>{item.fullName}</p>
                                                   </div>
                                                   {
                                                      user._id !== item._id && (
                                                         user.isFollow.find(x => x === item._id) ? (
                                                            <button className="post__heart-isfollow">Đang theo dõi</button>
                                                         ) : (
                                                            <button className="post__heart-follow">Theo dõi</button>
                                                         )
                                                      ) 
                                                   }
                                                </div>
                                             ))
                                          }
                                       </div>
                                    </div>
                                 )
                              }
                           </div>
                        </div>
                        <div className="post__wrap">
                           <div className="post__comments">
                              {
                                 post.comments && (
                                    post.comments.map(cmt => (
                                       <div className="post__comments-item" key={cmt._id}>
                                          <h4 className="post__comments-user">
                                             { cmt.user.displayName ? cmt.user.displayName : user.displayName }
                                          </h4>
                                          <p className='post__comments-content'>{cmt.content}</p>
                                       </div>
                                    ))
                                 )
                              }
                           </div>
                        </div>
                        <div className="post__wrap">
                           <div className="post__addcomment">
                                 <FaRegSmile className='post__addcomment-icon' />
                                 <input onChange={e => setCommentValue(e.target.value)} type="text" placeholder='Thêm bình luận...' />
                                 <button 
                                    className={`post__addcomment-submit ${commentValue ? 'post__addcomment-submit--active': ''}`}
                                    onClick={e => handleCommentPost(e, post._id)}
                                 >
                                    Đăng
                                 </button>
                              </div>
                           </div>
                        </div>
                  ))
               ) : (
                  <Loading />
               )
            }
        </div>
     );
}

export default Posts;