
const DeviceLocationSuspender = () => {
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

export default DeviceLocationSuspender;