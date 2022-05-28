import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiMap } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'
import { FaRegImages } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import user_avt from '../../assets/images/user_avt.jpg'
import { addPost, uploadImage } from '../../redux/apiRequest'
import { addPostt } from '../../redux/postSlice'
import { handleEnableScroll } from '../../services'
import Loading from '../Loading'
import './style.scss'

function AddPost({ showModal }) {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.login.currentUser)

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [caption, setCaption] = useState('')
    const [imageSelected, setImageSelected] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const handleCloseModal = () => {
        showModal(false)
        handleEnableScroll()
    }

    const handleImageChange = e => {
        const files = e.target.files

        setImageSelected(files[0])
        setImagePreview(URL.createObjectURL(files[0]))

        setShow(true)
    }

    const handleAddPost = async () => {
        setLoading(true)

        // UPLOAD IMAGE TO CLOUD
        const data = new FormData()

        data.append('file', imageSelected)
        data.append('upload_preset', 'instagramimages')

        const file = await uploadImage(data)

        // CALL API
        const { post } = await addPost(user.accessToken, user._id, { 
            title: caption,
            urlImage: file.secure_url
         })

        setLoading(false)

        dispatch( addPostt(post) )

        showModal(false)

        handleEnableScroll()
    }

    return ( 
        <div className="add">

            <div className="add__overlay"></div>
            
            <div className={`add__before ${show ? 'add__before--disabled' : ''}`}>
                <h5 className="add__before-sologan">Tạo bài viết mới</h5>
                <div className="add__before-content">
                    <FaRegImages className='add__before-icon' />
                    <p className="add__before-heading">Kéo ảnh và video vào đây</p>
                    <div className="add__before-file">
                        <input type="file" id='file__input' onChange={handleImageChange} />
                        <label htmlFor="file__input">Chọn từ máy tính</label>
                    </div>
                </div>
            </div>

            {
                !loading ? (
                    <>
                        <div className={`add__after ${show ? 'add__after--actived' : ''}`}>
                            <div className="add__after-top">
                                <IoIosArrowRoundBack className='add__after-icon' onClick={() => setShow(false)} />
                                <h5 className="add__after-sologan">Tạo bài viết mới</h5>
                                <button className="add__after-share" onClick={handleAddPost}>Chia sẻ</button>
                            </div>
                            <div className="add__after-content">
                                <img src={imagePreview} alt="image" className="add__after-image" />
                                <div className="add__after-info">
                                    <div className="add__after-user">
                                        <img src={user.avatar ? user.avatar : user_avt} alt="img-user" />
                                        <span>{user.displayName}</span>
                                    </div>
                                    <textarea onChange={e => setCaption(e.target.value)} rows="8" placeholder='Viết chú thích...' className='add__after-caption' res></textarea>
                                    <ul className="add__after-list">
                                        <li className="add__after-item add__after-item--first">
                                            <BsEmojiSmile className='add__after-iconn' />
                                            <div> <span>{caption.length}</span> /2,200 </div>
                                        </li>
                                        <li className="add__after-item">
                                            <input type="text" placeholder='Thêm vị trí' />
                                            <BiMap className='add__after-iconn' />
                                        </li>
                                        <li className="add__after-item">
                                            <span className='add__after-text'>Trợ năng</span>
                                            <IoIosArrowDown className='add__after-iconn' />
                                        </li>
                                        <li className="add__after-item">
                                            <span className='add__after-text'>Cài đặt nâng cao</span>
                                            <IoIosArrowDown className='add__after-iconn' />
                                        </li>
                                    </ul>
                                </div>  
                            </div>
                        </div>

                        <div className="add__close" onClick={handleCloseModal}>
                            <AiOutlineClose />
                        </div>
                    </>
                ) : (
                    <Loading style={true} />
                )
            }
        </div>
     );
}

export default AddPost;