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

  const registerUser = (data) => {
    const credentials = {
        username: data.registerusername,
        email: data.registeremail,
        password: data.registerpassword,
        role: ["user", "admin"]   
    }

    auth.signup(credentials)
      .then(data => {
          toast.success(data.message, {
              position: toast.POSITION.TOP_CENTER
            });
            console.log(data);
      },
      err => {
          toast.error(err, {
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

      <Button color={colors.primary.gradient.full}
      isDisabled={!formValid}
      variant="contained"
      size="medium"
      boxShadow="light"
      customStyles={{
          width: '100%'
      }}>Login</Button>
    </Form>
  )
}