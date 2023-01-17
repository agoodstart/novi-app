import React from 'react';
import {Outlet} from 'react-router-dom';
import useRequireAuth from '../hooks/useRequireAuth';

export default function RequireAuth() {
  const profileInformation = useRequireAuth() ?? null;

  return profileInformation === null ? null : <Outlet context={profileInformation} />
}