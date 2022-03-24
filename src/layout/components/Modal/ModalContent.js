import { Tabs, Tab, TabList, TabPanel } from "../Tabs/Tabs"
import RegisterForm from "../Form/RegisterForm"
import LoginForm from "../Form/LoginForm"

export default function ModalContent() {
    const tabStyles = {
        width: '65rem',
    }

    return (
        <Tabs customStyles={tabStyles}>
            <TabList>
                <Tab>Inloggen</Tab>
                <Tab>Registeren</Tab>
            </TabList>
            <TabPanel>
                <RegisterForm />
            </TabPanel>
            <TabPanel>
                <LoginForm />
            </TabPanel>
      </Tabs>
    )
}