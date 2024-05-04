import  { useContext } from 'react';
import { AuthContext } from '../pages/providers/AuthProvider';

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth
};

export default useAuth;
