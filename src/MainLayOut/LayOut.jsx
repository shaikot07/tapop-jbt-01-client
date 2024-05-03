
import { Outlet } from 'react-router-dom';
import NavBar from '../pages/Homes/NavBar/NavBar';

const LayOut = () => {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default LayOut;