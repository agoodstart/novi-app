import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './layout/pages/Home/Home';
import Dashboard from './layout/pages/Dashboard/Dashboard';
import Login from './layout/pages/Login/Login.js';
import Register from './layout/pages/Register/Register';
import Unauthorized from './layout/pages/Unauthorized/Unauthorized';
import NotFound from './layout/pages/NotFound/NotFound';

import RequireAuth from './routes/RequireAuth';
import Profile from './layout/pages/Profile/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="registreren" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />      
      </Route>
    </Routes>
  );
}
