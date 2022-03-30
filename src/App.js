import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './layout/pages/Home/Home';
import Dashboard from './layout/pages/Dashboard/Dashboard';
import Unauthorized from './layout/pages/Unauthorized/Unauthorized';
import NotFound from './layout/pages/NotFound/NotFound';
import Test from './layout/pages/Test/Test'

import RequireAuth from './routes/RequireAuth';
import Profile from './layout/pages/Profile/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="test" element={<Test />} />

        <Route element={<RequireAuth />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />      
      </Route>
    </Routes>
  );
}
