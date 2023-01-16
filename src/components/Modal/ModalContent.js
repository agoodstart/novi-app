import { Tabs, Tab, TabList, TabPanel } from "../Tabs/Tabs";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";

import useTheme from "../../hooks/useTheme";

export default function ModalContent() {
    const {colors } = useTheme();

    return (
        <Tabs backgroundColor={colors.background.white.main}>
            <TabList>
                <Tab
                    activeBackgroundColor={colors.background.white.main}
                    inactiveBackgroundColor={colors.background.black.alpha['40']}
                >Log in</Tab>
                <Tab
                    activeBackgroundColor={colors.background.white.main}
                    inactiveBackgroundColor={colors.background.black.alpha['40']}
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