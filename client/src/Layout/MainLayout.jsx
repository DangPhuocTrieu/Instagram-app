import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import '../scss/global.scss'

function MainLayout() {
    return ( 
        <>
            <Header />
            <div className="spacing">
                <Outlet/>
            </div>
        </>
     );
}

export default MainLayout;