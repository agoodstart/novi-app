import { useOutletContext } from "react-router-dom";

import useTheme from '../../../hooks/useTheme';

import Typography from '../../../components/Typography/Typography';
import Image from '../../../components/Image/Image';
import Center from '../../../components/Center/Center';
import Container from "../../../components/Container/Container";

export default function Destination() {
  console.log('render');
  const {resource, destination} = useOutletContext();
  const {colors} = useTheme();
  const imageSource = resource.read();

  return(
    <Container element="section">
      <Image source={imageSource} />

      <Center>
        <Typography fontWeight="700" elevation={3} textColor={colors.text.white} variant="h1">
          {destination?.city.long_name}
        </Typography>

        <Typography elevation={3} textColor={colors.text.white} variant="h2">
          {destination?.country.long_name}
        </Typography>
      </Center>
    </Container>
  )
}