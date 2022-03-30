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
  const getGeoInfo = () => {
    let coord = new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          let encoded = encodeURIComponent(`${pos.coords.latitude},${pos.coords.longitude}`);
          console.log(encoded);
          return res({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        error => rej(error)
      )
    })

    return Promise.resolve(coord);
  }

  let coordinates = getGeoInfo();
  
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
