import { useRef, useEffect } from "react";
import { TextInput } from "../Form/Form";
import useGoogleApi from "../../hooks/useGoogleApi";

const withPlaces = (Component) => ({autocompleteInstance, defaultLocation, onPlaceChange, types, customStyles}) => {
  const { api } = useGoogleApi();
  const { autocomplete, createAutocomplete } = autocompleteInstance;
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if(autocompleteRef.current && !autocomplete && autocompleteRef.current instanceof HTMLInputElement) {
      createAutocomplete(autocompleteRef.current, {
        types
      })
    }
  }, [autocomplete, autocompleteRef])

  useEffect(() => {
    for (const [key, value] of Object.entries(customStyles)) {
      autocompleteRef.current.style[key] = value
    }
  }, [autocompleteRef, customStyles])

  useEffect(() => {
    if(autocompleteRef.current && autocomplete && autocompleteRef.current instanceof HTMLInputElement) {
      console.log(defaultLocation);
      autocompleteRef.current.value = defaultLocation
    }
  }, [defaultLocation, autocomplete, autocompleteRef])

  useEffect(() => {
    if(autocomplete && api.map) {
      if(onPlaceChange) {
        autocomplete.addListener("place_changed", () => onPlaceChange(autocomplete))
      }
    }
  }, [autocomplete, onPlaceChange, api.map])

  return (
    <Component iRef={autocompleteRef} />
  )
}

const TextInputWithGooglePlaces = withPlaces(TextInput);

export default TextInputWithGooglePlaces;