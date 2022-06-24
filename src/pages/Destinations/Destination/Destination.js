import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Typography from '../../../components/Typography/Typography';

// import { TranslationServiceClient } from '@google-cloud/translate';

import useLocalStorage from '../../../hooks/useLocalStorage';

export default function Destination() {
  const params = useParams();
  console.log(params);

  // const translationClient = new TranslationServiceClient();
  // const projectId = 'novi-341411';
  // const location = 'global';
  // const text = 'Hello, world!';

  // async function translateText() {
  //   // Construct request
  //   const request = {
  //       parent: `projects/${projectId}/locations/${location}`,
  //       contents: [text],
  //       mimeType: 'text/plain', // mime types: text/plain, text/html
  //       sourceLanguageCode: 'en',
  //       targetLanguageCode: 'es',
  //   };
  
  //   // Run request
  //   const [response] = await translationClient.translateText(request);
  
  //   for (const translation of response.translations) {
  //       console.log(`Translation: ${translation.translatedText}`);
  //   }
  // }
  

  const [savedDestination, setSavedDestination] = useState({})
  const [destinations, setDestinations] = useLocalStorage("destinations", []);

  const setData = useCallback(() => {
    setSavedDestination(destinations.find(destination => destination.id === params.id))
  }, [setSavedDestination])

  useEffect(() => {
    setData();
  }, [setData]);

  useEffect(() => {
    // translateText();
  }, []);

  return(
    <>
    <Typography variant="h1">{savedDestination.addr}</Typography>
    {/* <div>{params}</div> */}
    {/* <div>{location.pathname}</div> */}

    </>
  )
}