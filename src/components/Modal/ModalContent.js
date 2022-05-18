import { Tabs, Tab, TabList, TabPanel } from "../Tabs/Tabs";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";

import useTheme from "../../hooks/useTheme";

export default function ModalContent() {
    const {colors } = useTheme();

    console.log(colors.black);

    const tabStyles = {
        width: '65rem',
    }

    return (
        <Tabs color={colors.white}>
            <TabList>
                <Tab>Inloggen</Tab>
                <Tab>Registeren</Tab>
            </TabList>
            <TabPanel>
                <LoginForm />
            </TabPanel>
            <TabPanel>
                <RegisterForm />
            </TabPanel>
      </Tabs>
    )
}