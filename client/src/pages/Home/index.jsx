import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Posts from "../../components/Posts";
import User from "../../components/User";
import './style.scss'

function Home() {
    const user = useSelector(state => state.auth.login.currentUser)
    
    if(!user) {
        return <Navigate to='/login' />
    }

    return ( 
        <div className="home container">
            <Posts />
            <User />
        </div>
     );
}

export default Home;
