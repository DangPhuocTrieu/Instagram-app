import { useEffect, useState } from 'react';
import { AiFillHeart, AiFillMessage } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { getPostsUser } from '../../redux/apiRequest';
import './style.scss';

function PostsUser() {
    const user = useSelector(state => state.auth.login.currentUser)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        ( async () => {
            const data = await getPostsUser(user.accessToken, user._id)
            setPosts(data.posts)
        })()
    }, [])
    

    return ( 
        <div className="postU">
            {
                posts.length > 0 ? (
                    posts.map(post => (
                        <div className="postU__item" key={post._id}>
                            <img src={post.urlImage} alt="post image" className='postU__image' />
                            <div className="postU__info">
                                <div className="postU__heart postU__row">
                                    <AiFillHeart />
                                    <span>{post.heartList.length}</span>
                                </div>
                                <div className="postU__comment postU__row">
                                    <AiFillMessage />
                                    <span>{post.comments.length}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='postU__empty'>Chưa có bài viết nào!</p>
                )
            }
        </div>
     );
}

export default PostsUser;