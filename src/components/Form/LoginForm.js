import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

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
    if(!formValid) {
      target.disabled = true;
    } else {
      target.disabled = false;
    }
  }

  const loginUser = async (data) => {
    const credentials = {
      username: data.loginusername,
      password: data.loginpassword,
    }

    try {
      await auth.signin(credentials);
      toast.success('Logging in...', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });

      modalRef.current.closeModal();
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000);
    } catch(err) {
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER
      });
    }
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