import { useEffect, useState, useCallback } from 'react';
import { useNavigate,  } from 'react-router-dom';
import useAuth from './useAuth';
import { toast } from 'react-toastify';

export default function useRequireAuth() {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [profileInformation, setProfileInformation] = useState(null);

    const fetchProfileInformation = useCallback(async () => {
        console.log('gets called after mount, then runs console.log(user) again')
        try {
          const data = await auth.profile(auth.user?.accessToken);
          setProfileInformation(data);
        } catch(err) {
          toast.error("Unable to fetch profile information, logging out...", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
          })
        }
      }, []);

    useEffect(() => {
        if(!auth.user) {
            navigate('/unauthorized')
        }

        fetchProfileInformation();
    }, [auth, navigate, fetchProfileInformation])

    return profileInformation;
}