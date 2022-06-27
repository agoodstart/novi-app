import React from 'react';
import { Tabs, Tab, TabList, TabPanel } from '../../../components/Tabs/Tabs';

const DestinationTabs = () => {
  console.log('1, 2, 3');

  return (
    <Tabs>
    <TabList>
      <Tab>
        Currency
      </Tab>
      <Tab>
        Translator
      </Tab>
    </TabList>

    <TabPanel>
      Currency
    </TabPanel>

    <TabPanel>
      Translator
    </TabPanel>
  </Tabs>
  )
}

const MemoizedDestinationTabs = React.memo(DestinationTabs);

export default MemoizedDestinationTabs;