import { Tabs, Tab, TabList, TabPanel } from "../Tabs/Tabs";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";

import useTheme from "../../hooks/useTheme";

export default function ModalContent() {
    const {colors } = useTheme();

    return (
        <Tabs backgroundColor={colors.background.gray.light}>
            <TabList>
                <Tab
                    activeBackgroundColor={colors.background.gray.light}
                    inactiveBackgroundColor={colors.background.gray.main}
                >Log in</Tab>
                <Tab
                    activeBackgroundColor={colors.background.gray.light}
                    inactiveBackgroundColor={colors.background.gray.main}
                >Register</Tab>
            </TabList>
            <TabPanel backgroundColor={colors.background.gray.light}>
                <LoginForm />
            </TabPanel>
            <TabPanel backgroundColor={colors.background.gray.light}>
                <RegisterForm />
            </TabPanel>
      </Tabs>
    )
}