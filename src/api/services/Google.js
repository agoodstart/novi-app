import axios from "axios";
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

class GoogleService {
  #GeocodeAPI;

  constructor() {
    this.#GeocodeAPI = this.#createAPI();
  };

  #createAPI = () => {
    const geocodeAPI = axios.create({
      baseURL: "https://maps.googleapis.com/maps/api/geocode",
    })

    return geocodeAPI;
  }

  getGeocodeJSON = (lat, lng, depth) => {
    const params = new URLSearchParams({
      latlng: `${lat},${lng}`,
      key: REACT_APP_GOOGLE_MAPS_API_KEY
    });

    return this.#GeocodeAPI.get(`json?${params}`).then(response => {
      return response.data.results[depth]
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
        console.log('error');
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