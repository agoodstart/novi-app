import {Outlet} from 'react-router-dom';
import useRequireAuth from '../hooks/useRequireAuth';

export default function RequireAuth() {
  const auth = useRequireAuth();

  if(!auth.user) {
    return null;
  }

  return <Outlet context={auth?.user} />
}