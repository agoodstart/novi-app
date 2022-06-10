import { Wrapper } from "@googlemaps/react-wrapper";
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const render = (status) => {
    switch (status) {
      case 'LOADING':
        return 'loading...';
      case 'FAILURE':
        return 'error!';
      case 'SUCCESS':  
        return 'success!';
    }
}

const loadLibraries = () => {
  return [
    "places"
  ]
}
export default function GoogleApiWrapper({children}) {

  return (
    <Wrapper apiKey={REACT_APP_GOOGLE_MAPS_API_KEY} render={render} libraries={["places"]} >
      {children}
    </Wrapper>
  )
}