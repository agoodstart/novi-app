import { useContext } from 'react'
import { AmadeusApiContext } from '../context/AmadeusApiProvider';

export default function useAmadeusApi() {
  return useContext(AmadeusApiContext);
}