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

  const registerUser = async (data) => {
    const credentials = {
        username: data.registerusername,
        email: data.registeremail,
        password: data.registerpassword,
        roles: ["user", "admin"],
        base64Image: "data:image/png;base64,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"
    }

    try {
      const data = await auth.signup(credentials);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER
      });

    } catch(err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  const inputStyle = {
    borderRadius: '30px',
    border: '1px solid rgba(0, 0, 0, .20)',
  }

  return (
    <Form onSubmit={registerUser} onValidate={changeFormValidation}>

      <FormControl validations={[ Validate.isRequired(), Validate.minLength(5) ]}>
        <TextInput placeholder="Username" name="registerusername" customStyles={inputStyle} />
      </FormControl>

      <FormControl validations={[ Validate.isRequired(), Validate.isEmail()]}>
        <EmailInput placeholder="Email" name="registeremail" customStyles={inputStyle} />
      </FormControl>
      
      <FormControl validations={[ Validate.isRequired(), Validate.minLength(6) ]}>
        <PasswordInput placeholder="Password" name="registerpassword" customStyles={inputStyle} />
      </FormControl>

      <FormControl validations={[ Validate.isRequired(), Validate.passwordMatch("registerpassword") ]}>
        <PasswordInput placeholder="Confirm Password" name="confirmpassword" customStyles={inputStyle} />
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