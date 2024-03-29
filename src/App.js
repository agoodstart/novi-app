import { Route, Routes } from 'react-router-dom';

import RequireAuth from './routes/RequireAuth';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import DashboardHome from './pages/DashboardHome/DashboardHome';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import Social from './pages/Social/Social';
import AddTravelPlan from './pages/AddTravelPlan/AddTravelPlan';
import Destinations from './pages/Destinations/Destinations';
import Destination from './pages/Destinations/Destination/Destination';

import WebsiteLayout from './layout/WebsiteLayout/WebsiteLayout';
import DashboardLayout from './layout/DashboardLayout/DashboardLayout';
import DestinationRouting from './routes/DestinationRouting';

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />      
      <Route path="unauthorized" element={<Unauthorized />} />

      <Route path="/" element={<WebsiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* User authentication beyond this point */}
      <Route path="/" element={<RequireAuth />} >
        <Route path="/" element={<DashboardLayout />} >
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="destinations" element={<Destinations/>} />

          <Route path="destinations/destination/" element={<DestinationRouting />}>
            <Route index={true} path=":id" element={<Destination />} />
          </Route>
          
          <Route path="addtravelplan" element={<AddTravelPlan />} />
          <Route path="profile" element={<Profile />} />
          <Route path="social" element={<Social />} />
        </Route>
      </Route>
    </Routes>
  );
}
