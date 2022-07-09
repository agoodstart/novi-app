

export const useSuspender = () => {
  const locationSuspender = () => {
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
}

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