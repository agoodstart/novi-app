import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

function useRequireAuth() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.user) {
            navigate('/')
        }
    }, [auth])

    return auth;
}

export default useRequireAuth;