import axios from 'axios';
import { Suspense } from 'react';
import { Outlet} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const { REACT_APP_PEXELS_API_KEY } = process.env;

const fetchPexelsAPI = (query) => {
  let status = 'pending';
  let response;

  const suspender = new Promise((resolve, reject) => {
    axios.get(`https://api.pexels.com/v1/search?orientation=landscape&query=${query}`, {
      headers: {
        "Authorization": REACT_APP_PEXELS_API_KEY
      }
    }).then(result => {
      resolve(result.data.photos[0].src.landscape)
    }, error => {
      reject(error);
    })
  }).then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err) => {
      status = 'error';
      console.log('error');
      response = err;
    })

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response;
      default:
        return response;
    }
  }

  return { read }
}

export default function DestinationRouting() {
  const location = useLocation();
  const resource = fetchPexelsAPI(location.state.city.short_name);

  return (
    <Suspense fallback={<p>Loading Pexels API....</p>}>
      <Outlet context={{
        resource: resource,
        destination: location.state
      }} />
    </Suspense>
  )
}