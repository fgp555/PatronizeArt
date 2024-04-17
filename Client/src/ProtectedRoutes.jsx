import { useContext } from 'react';
import {Navigate,Outlet} from 'react-router-dom'
import { AuthContext } from './context/authContext';

const ProtectedRoutes = () => {
    const {Authorized} = useContext(AuthContext)


  if (!Authorized) return <Navigate to={"/"} replace />;
 (
        <div className='flex'>
        <Outlet/>
        </div>
        
    )
}

export default ProtectedRoutes;