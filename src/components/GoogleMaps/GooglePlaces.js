import {useState, useRef, useEffect} from 'react'
import styles from './GoogleMaps.module.scss';

export default function GooglePlaces({setDefaultValue, onPlaceChange}) {
  const [autocomplete, setAutocomplete] = useState();
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if(autocompleteRef.current && !autocomplete && autocompleteRef.current instanceof HTMLInputElement) {
      setAutocomplete(new google.maps.places.Autocomplete(autocompleteRef.current, {
        types: ['(cities)']
      }))
    }
  }, [autocomplete, autocompleteRef])

  useEffect(() => {
    if(autocomplete) {
      
      if(onPlaceChange) {
        autocomplete.addListener("place_changed", () => onPlaceChange(autocomplete))
      }
    }
  }, [autocomplete, onPlaceChange])

  // useEffect(() => {
  //   console.log('input element:', autocompleteRef.current);
  //   console.log(autocompleteRef.current instanceof HTMLInputElement);
  // })



  return (
    <input type="text" className={styles['places']} value={setDefaultValue} id="autocomplete" ref={autocompleteRef} />
  )
}