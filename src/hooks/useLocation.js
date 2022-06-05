import GoogleService from '../api/services/Google';

const wrappedLocation = GoogleService.deviceLocationSuspender();

export default function useLocation() {

  const calculateMarkerDistance = (mk1, mk2) => {
    // I didn't calc this myself lol
    // https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
    const R = 6371.0710 // Radius of earth in km
    // var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)
  
    // idk wtf this calculation is but whatever
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }

  const getGeocodedAddress = (lat, lng, depth) => {
    GoogleService.getGeocodeJSON(lat, lng)
      .then(results => {
        console.log(results[results.length - 1].formatted_address)
      })
  }
  
  const getDeviceLocation = () => {
    console.log('test device locaiton')

    return wrappedLocation.unwrap();
  }

  return {
    getDeviceLocation,
    getGeocodedAddress,
  }
}