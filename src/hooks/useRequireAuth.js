import { useEffect, useState, useCallback } from 'react';
import { useNavigate,  } from 'react-router-dom';
import useAuth from './useAuth';
import { toast } from 'react-toastify';

export default function useRequireAuth() {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [profileInformation, setProfileInformation] = useState(null);
    
    const fetchProfileInformation = useCallback(async () => {
      try {
          const data = await auth.profile(auth.user?.accessToken);
          setProfileInformation(data);
        } catch(err) {
          toast.error(err, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
          })
        }
      }, []);

    useEffect(() => {
        if(!auth.user) {
            navigate('/unauthorized')
        }
    }, [auth, navigate]);

    useEffect(() => {
      if(!profileInformation) {
        fetchProfileInformation();
      }
    }, [fetchProfileInformation]);

    return profileInformation;
}