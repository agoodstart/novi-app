import axios from "axios";
const { REACT_APP_GOOGLE_MAPS_API_KEY, REACT_APP_GOOGLE_GEOLOCATION_API } = process.env;

class GoogleService {
  #GeocodeAPI;

  constructor() {
    this.#GeocodeAPI = this.#createAPI();
  };

  #createAPI = () => {
    const params = new URLSearchParams({
      key: REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const url = `https://maps.googleapis.com/maps/api/geocode/json?${params}`;

    const geocodeAPI = axios.create({
      baseURL: "https://maps.googleapis.com/maps/api/geocode",
    })

    return geocodeAPI;
  }

  getGeocodeJSON = (lat, lng) => {
    const params = new URLSearchParams({
      latlng: `${lat},${lng}`,
      key: REACT_APP_GOOGLE_MAPS_API_KEY
    });

    return this.#GeocodeAPI.get(`json?${params}`).then(response => {
      return response.data.results
    })
  }

  deviceLocationSuspender = () => {
    let status = 'pending';
    let response;

    const suspender = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          return resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        error => reject(error)
      )
    }).then(
      (res) => {
        status = 'success';
        response = res;
      },
      (err) => {
        status = 'error';
        response = err;
      })
  
    const unwrap = () => {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'error':
          throw response;
        default:
          return response;
      }
    }

    return { unwrap }
  }
}

export default new GoogleService();