import { useRef, useEffect, useState } from "react";
import { TextInput } from "../Form/Form";
import useGoogleApi from "../../hooks/useGoogleApi";

const withPlaces = (Component) => ({autocompleteInstance, defaultLocation, onPlaceChange, types, customStyles}) => {
  const { map } = useGoogleApi();
  const { autocomplete, createAutocomplete } = autocompleteInstance;
  const autocompleteRef = useRef(null);
  const [listener, setListener] = useState(false);

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
      autocompleteRef.current.value = defaultLocation
    }
  }, [defaultLocation, autocomplete, autocompleteRef])

  useEffect(() => {
    if(autocomplete && map && !listener) {
      autocomplete.addListener("place_changed", () => {
        setListener(true);
        onPlaceChange(autocomplete)
      })
    }
  }, [listener, autocomplete, map])

  return (
    <Component iRef={autocompleteRef} />
  )
}

const TextInputWithGooglePlaces = withPlaces(TextInput);

export default TextInputWithGooglePlaces;