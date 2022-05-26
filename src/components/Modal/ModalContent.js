import { Tabs, Tab, TabList, TabPanel } from "../Tabs/Tabs";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";

import useTheme from "../../hooks/useTheme";

export default function ModalContent() {
    const {colors } = useTheme();

    return (
        <Tabs color={colors.white}>
            <TabList>
                <Tab
                    activeBackgroundColor={colors.grey.light}
                    inactiveBackgroundColor={colors.grey.medium}
                >Inloggen</Tab>
                <Tab
                    activeBackgroundColor={colors.grey.light}
                    inactiveBackgroundColor={colors.grey.medium}
                >Registeren</Tab>
            </TabList>
            <TabPanel backgroundColor={colors.grey.light}>
                <LoginForm />
            </TabPanel>
            <TabPanel backgroundColor={colors.grey.light}>
                <RegisterForm />
            </TabPanel>
      </Tabs>
    )
}