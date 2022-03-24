import Form, { TextInput, EmailInput } from "../../components/Form/Form";
import Validate from "../../components/Form/validationRules";
import React, {useEffect} from 'react';
import {Tabs, Tab, TabList, TabPanel} from "../../components/Tabs/Tabs";
import RegisterForm from "../../components/Form/RegisterForm";




export default function Test() {
  useEffect(() => {
    console.log('test page rendered');
  })
    return (
      // <Form>
      //   <h3>Is this allowed?</h3>
      //   <TextInput placeholder="Username" name="username" type="text" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
      //   <TextInput placeholder="Email" name="email" type="email" validations={[ Validate.isRequired(), Validate.isEmail()]} />
      //   <TextInput placeholder="Password" name="password1" type="password" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
      //   <TextInput placeholder="Password" name="password2" type="password" validations={[ Validate.isRequired(), Validate.passwordMatch("password1") ]} />
        
      // </Form>
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <RegisterForm />
        </TabPanel>

        <TabPanel></TabPanel>
      </Tabs>
    );
  }