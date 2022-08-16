import { useState } from 'react';
import { toast } from 'react-toastify';

import useAuth from "../../hooks/useAuth";
import useTheme from '../../hooks/useTheme';

import Validate from "./validationRules";

import Form, { FormControl, TextInput, EmailInput, PasswordInput } from "./Form";
import Button from "../Button/Button";

export default function RegisterForm() {
  const { colors } = useTheme();
  const { auth } = useAuth();
  const [formValid, setFormValid] = useState(false);

  const changeFormValidation = (isValid) => {
    setFormValid(isValid)
  }

  const checkButtonDisabled = (target) => {
    if(!formValid) {
      target.disabled = true;
    } else {
      target.disabled = false;
    }
  }

  const registerUser = (data) => {
    const credentials = {
        username: data.registerusername,
        email: data.registeremail,
        password: data.registerpassword,
        roles: ["user", "admin"]
    }

    auth.signup(credentials)
      .then(data => {
          toast.success(data.message, {
              position: toast.POSITION.TOP_CENTER
            });
            console.log(data);
      },
      err => {
          toast.error(err.message, {
              position: toast.POSITION.TOP_CENTER
          })
      });
  }

  return (
    <Form onSubmit={registerUser} onValidate={changeFormValidation}>

      <FormControl validations={[ Validate.isRequired(), Validate.minLength(5) ]}>
        <TextInput placeholder="Username" name="registerusername" />
      </FormControl>

      <FormControl validations={[ Validate.isRequired(), Validate.isEmail()]}>
        <EmailInput placeholder="Email" name="registeremail" />
      </FormControl>
      
      <FormControl validations={[ Validate.isRequired(), Validate.minLength(6) ]}>
        <PasswordInput placeholder="Password" name="registerpassword" />
      </FormControl>

      <FormControl validations={[ Validate.isRequired(), Validate.passwordMatch("registerpassword") ]}>
        <PasswordInput placeholder="Confirm Password" name="confirmpassword" />
      </FormControl>

      <Button color={colors.background.primary.dark}
      isDisabled={checkButtonDisabled}
      size="medium"
      elevation={2}
      customStyles={{
          width: '100%'
      }}>Register</Button>
    </Form>
  )
}