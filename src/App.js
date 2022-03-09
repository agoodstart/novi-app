import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './layout/pages/Home/Home';
import Dashboard from './layout/pages/Dashboard/Dashboard';
import Login from './layout/pages/Login/Login.js';
import Register from './layout/pages/Register/Register';
import NotFound from './layout/pages/NotFound/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" exact element={<Home />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/registreren" exact element={<Register />} />

        <Route path="*" element={<NotFound />} />      
      </Route>
    </Routes>
  );
}
