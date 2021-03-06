import { useEffect } from 'react'
import { useNavigate,  } from 'react-router-dom';
import useAuth from './useAuth';

export default function useRequireAuth() {
    const {auth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.user) {
            navigate('/unauthorized')
        }
    }, [auth, navigate])

    return auth;
}