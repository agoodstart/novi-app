import { Tabs, Tab, TabList, TabPanel } from "../Tabs/Tabs";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";

import useTheme from "../../hooks/useTheme";

export default function ModalContent() {
    const {colors } = useTheme();

    return (
        <Tabs backgroundColor={colors.background.black.alpha['50']}>
            <TabList>
                <Tab
                    activeBackgroundColor={colors.background.black.alpha['15']}
                    inactiveBackgroundColor={colors.background.black.alpha['50']}
                >Log in</Tab>
                <Tab
                    activeBackgroundColor={colors.background.black.alpha['15']}
                    inactiveBackgroundColor={colors.background.black.alpha['80']}
                >Register</Tab>
            </TabList>
            <TabPanel backgroundColor={colors.background.black.alpha['95']}>
                <LoginForm />
            </TabPanel>
            <TabPanel backgroundColor={colors.background.black.alpha['95']}>
                <RegisterForm />
            </TabPanel>
      </Tabs>
    )
}