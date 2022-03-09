import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';

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
