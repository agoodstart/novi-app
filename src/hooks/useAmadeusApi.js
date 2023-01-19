import axios from 'axios';
import { useState, useEffect } from 'react';
const { REACT_APP_AMADEUS_BASE_URL } = process.env;
const { REACT_APP_AMADEUS_CLIENT_ID } = process.env;
const { REACT_APP_AMADEUS_CLIENT_SECRET } = process.env;

export default function useAmadeusApi() {
  const [bearerToken, setBearerToken] = useState("");
  const [locations, setLocations] = useState([])

  const amadeus = axios.create({
    baseURL: REACT_APP_AMADEUS_BASE_URL
  });


  amadeus.interceptors.request.use(config => {
    console.log(bearerToken);
    config.headers = {
      'Authorization': `Bearer ${bearerToken}`
    }
    return config;
  });

  amadeus.interceptors.response.use(response => {
    return response
  }, async (err) => {
    const originalRequest = err.config;

    console.log(err);

    // if(err.response.status === 401) {

    // }
  })

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', REACT_APP_AMADEUS_CLIENT_ID);
    params.append('client_secret', REACT_APP_AMADEUS_CLIENT_SECRET);

    axios.post(`${REACT_APP_AMADEUS_BASE_URL}/security/oauth2/token`, params, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      console.log('called from useeffect');
      setBearerToken(res.data.access_token)
    }).catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    if(bearerToken) {
      getLocationsInRadius();
    }
  }, [bearerToken]);

  const getLocationsInRadius = () => {
    const params = new URLSearchParams();
    params.append('latitude', '52.3759');
    params.append('longitude', '4.8975');
    params.append('radius', '500');
    params.append('page[limit]', '100');
    params.append('sort', 'analytics.flights.score');

    amadeus.get('/reference-data/locations/airports', {
      params: params
    }).then(res => {
      setLocations(res.data.data)
    }).catch(err => {
      console.log(err);
    })
  }

  return {
    locations
  }
}