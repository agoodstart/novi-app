import {useState, useRef, useEffect} from 'react'
import styles from './GoogleMaps.module.scss';
import useGoogleApi from "../../hooks/useGoogleApi";

export default function GooglePlaces({setDefaultValue, onPlaceChange}) {
  const {autocomplete, createAutocomplete} = useGoogleApi();
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if(autocompleteRef.current && !autocomplete && autocompleteRef.current instanceof HTMLInputElement) {
      // console.log(autocompleteRef.current)
      createAutocomplete(autocompleteRef.current, {
        types: ['(cities)']
      })
    }
  }, [autocomplete, autocompleteRef])

  useEffect(() => {
    if(autocompleteRef.current && autocomplete && autocompleteRef.current instanceof HTMLInputElement) {
      autocompleteRef.current.value = setDefaultValue
    }
  }, [setDefaultValue, autocomplete, autocompleteRef])

  useEffect(() => {
    if(autocomplete) {
      
      if(onPlaceChange) {
        autocomplete.addListener("place_changed", () => onPlaceChange(autocomplete))
      }
    }
  }, [autocomplete, onPlaceChange])



  return (
    <>
    <div className={styles['places']}>
      <label className={styles['places__label']}>Your current location: </label>
      <input type="text" className={styles['places__input']} id="autocomplete" ref={autocompleteRef} />
    </div>
    </>
  )
}