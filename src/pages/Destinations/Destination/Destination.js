import { useOutletContext } from "react-router-dom";

import useTheme from '../../../hooks/useTheme';

import Typography from '../../../components/Typography/Typography';
import Image from '../../../components/Image/Image';
import Center from '../../../components/Center/Center';
import { Tabs, Tab, TabList, TabPanel } from '../../../components/Tabs/Tabs';

import styles from './Destination.module.scss';

import Currency from './Currency';
import MemoizedDestinationTabs from './DestinationTabs';

export default function Destination() {
  console.log('render');
  const {resource, destination} = useOutletContext();
  const {colors} = useTheme();
  const imageSource = resource.read();

  return(
    <>
      <div className={styles['destination__headline']}>
      <Image source={imageSource} />

        <Center>
          <Typography fontWeight="700" textShadow textColor={colors.white} variant="h1">
            {destination?.city.long_name}
          </Typography>

          <Typography textShadow textColor={colors.white} variant="h2">
            {destination?.country.long_name}
          </Typography>
        </Center>
      </div>

    {/* <div className={styles['destination__tabs']}>
        <Tabs>
        <TabList>
          <Tab>
            Currency
          </Tab>
          <Tab>
            Translator
          </Tab>
          <Tab>
            Weather forecast
          </Tab>
          <Tab>
            Map
          </Tab>
        </TabList>

        <TabPanel>
          Currency
        </TabPanel>

        <TabPanel>
          Translator
        </TabPanel>

        <TabPanel>
          Weather forecast
        </TabPanel>

        <TabPanel>
          Map
        </TabPanel>
      </Tabs>
    </div> */}

    {/* <div className={styles['test__div']}></div> */}
    </>
  )
}