import { useEffect } from 'react'
import { useNavigate,  } from 'react-router-dom';
import useAuth from './useAuth';

export default function useRequireAuth() {
    const {auth} = useAuth();
    const navigate = useNavigate();

    console.log(auth.user);

    useEffect(() => {
        if(!auth.user) {
            console.log('test');
            navigate('/unauthorized')
        }
    }, [auth, navigate])

    return auth;
}