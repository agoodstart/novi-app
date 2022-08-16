import {Outlet} from 'react-router-dom';
import useRequireAuth from '../hooks/useRequireAuth';

export default function RequireAuth() {
  const auth = useRequireAuth();

  return <Outlet context={auth?.user} />
}