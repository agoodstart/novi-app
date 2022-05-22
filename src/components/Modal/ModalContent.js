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
                    activeBackgroundColor={colors.tertiary.medium}
                    inactiveBackgroundColor={colors.tertiary.dark}
                >Inloggen</Tab>
                <Tab
                    activeBackgroundColor={colors.tertiary.medium}
                    inactiveBackgroundColor={colors.tertiary.dark}
                >Registeren</Tab>
            </TabList>
            <TabPanel backgroundColor={colors.tertiary.medium}>
                <LoginForm />
            </TabPanel>
            <TabPanel backgroundColor={colors.tertiary.medium}>
                <RegisterForm />
            </TabPanel>
      </Tabs>
    )
}