import { useOutletContext } from "react-router-dom";

import useTheme from '../../../hooks/useTheme';

import { useEffect, useState } from "react";

import Typography from '../../../components/Typography/Typography';
import Box from "../../../components/Box/Box";
import { Image } from '../../../components/Media/Media';
import Center from '../../../components/Center/Center';
import Container from "../../../components/Container/Container";
import Card, { CardBody, CardHeader } from "../../../components/Card/Card";

export default function Destination() {
  const {resource, weatherResource, destination} = useOutletContext();
  const {colors} = useTheme();
  const imageSource = resource.read();
  const weather = weatherResource.read();

  const [alerts, setAlerts] = useState(weather.alerts ?? []);

  console.log(weather.alerts)

  const dateTimeToLocaleString = (datetime) => {
    const d = new Date(datetime * 1000);
    return d.toLocaleDateString("en-GB", {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  useEffect(() => {
    if(alerts.length > 0) {
      alerts.forEach(alert => {
        console.log(dateTimeToLocaleString(alert.start));
        console.log("\n");
      })
    }
  }, [])


  return(
    <Container id={"destination-" + destination?.city?.long_name} element="section" backgroundColor={colors.background.black.alpha['15']}>
      <Box width={100} height={50}>
        <Image source={imageSource} width={100} height={100} />

        <Center>
          <Typography fontWeight="700" elevation={3} textColor={colors.text.white.main} variant="h1">
            {destination?.city.long_name}
          </Typography>

          <Typography elevation={3} fontWeight="500" textColor={colors.text.white.main} variant="h2">
            {/* countries like "Kosovo" doesn't show up */}
            {destination?.country?.long_name}
          </Typography>
        </Center>
      </Box>

      <Box padding={10} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} width={100} height={50}>
        <Typography textColor={colors.text.black.main} fontWeight="500" variant="h3">Weather forecast</Typography>

        <Box width={100} flexDirection={"row"} justifyContent={"space-between"} customStyles={{marginTop: '20px', overflowY: 'scroll', flexWrap: 'wrap'}}>
          {weather.daily.map((day, i) => (
            <Card key={i} outlined width={20} height={100} backgroundColor={colors.background.white.alpha['50']}>
              <CardHeader>
                <Typography textColor={colors.text.black.alpha['50']} fontWeight={700} variant="h5">{dateTimeToLocaleString(day.dt)}</Typography>
              </CardHeader>
              <CardBody>
                <Image width={35} height={"auto"} alt="Image of current weather" source={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} />
                <Box height="auto" flexDirection={"row"} justifyContent={"space-around"}>
                  <Typography variant="h5" textColor={colors.text.black.main} fontWeight="700">{day.temp.max} &#8451;</Typography> 
                  <Typography variant="h5" textColor={colors.text.black.alpha['40']}>{day.temp.min} &#8451;</Typography>
                </Box>

                <Typography variant="h5" textColor={colors.text.black.alpha['50']}>{day.weather[0].description}</Typography>
              </CardBody>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  )
}