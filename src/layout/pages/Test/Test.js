import Form, { TextInput, EmailInput } from "../../components/Form/Form";
import Validate from "../../components/Form/validationRules";
import React, {useEffect} from 'react';


export default function Test() {
  useEffect(() => {
    console.log('test page rendered');
  })
    return (
      <Form>
        <h3>Is this allowed?</h3>
        <TextInput placeholder="Username" name="username" type="text" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
        <TextInput placeholder="Email" name="email" type="email" validations={[ Validate.isRequired(), Validate.isEmail()]} />
        <TextInput placeholder="Password" name="password1" type="password" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
        <TextInput placeholder="Password" name="password2" type="password" validations={[ Validate.isRequired(), Validate.passwordMatch("password1") ]} />
        
      </Form>
    );
  }