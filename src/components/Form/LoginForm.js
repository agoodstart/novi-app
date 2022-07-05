import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useTheme from '../../hooks/useTheme';

import Validate from "./validationRules";

import Form, { FormControl, TextInput, PasswordInput } from "./Form";
import Button from "../Button/Button";

export default function LoginForm() {
  const { colors } = useTheme();
  const {auth, modalRef} = useAuth();
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);

  const changeFormValidation = (isValid) => {
    setFormValid(isValid)
  }

  const checkButtonDisabled = (target) => {
    console.log(target instanceof HTMLInputElement);
    if(!formValid) {
      target.disabled = true;
    } else {
      target.disabled = false;
    }
  }

  const loginUser = (data) => {
    const credentials = {
      username: data.loginusername,
      password: data.loginpassword,
    }

    auth.signin(credentials)
      .then(() => {
        modalRef.current.closeModal();
        navigate('/dashboard')
      },
      err => {
        console.log(err);
    });
  }

  return (
    <Form onSubmit={loginUser} onValidate={changeFormValidation}>

      <FormControl validations={[ Validate.isRequired(), Validate.minLength(5) ]}>
        <TextInput placeholder="Username" name="loginusername" />
      </FormControl>

      <FormControl validations={[ Validate.isRequired(), Validate.minLength(6) ]}>
        <PasswordInput placeholder="Password" name="loginpassword" />
      </FormControl>

      <Button color={colors.background.primary.dark}
      isDisabled={checkButtonDisabled}
      size="medium"
      elevation={2}
      customStyles={{
        width: '100%'
      }}>Login</Button>
      
    </Form>
  )
}