import { useContext, useDebugValue } from 'react'
import { GoogleApiContext } from '../context/GoogleApiProvider';

export default function useGoogleApi() {
    return useContext(GoogleApiContext);
}
