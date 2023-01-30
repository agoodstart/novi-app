import { Suspense } from 'react';
import { Outlet} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useSuspense from '../hooks/useSuspense';

export default function DestinationRouting() {
  const suspender = useSuspense();
  const location = useLocation();
  console.log(location)
  const resource = suspender.fetchPexelsAPI(location.state.city);
  const weatherResource = suspender.fetchOpenWeatherAPI(location.state.latlng)

  return (
    <Suspense fallback={<p>Loading Pexels API....</p>}>
      <Outlet context={{
        resource: resource,
        weatherResource: weatherResource,
        destination: location.state
      }} />
    </Suspense>
  )
}