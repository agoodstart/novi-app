import Form, {TextInput, FormControl} from "./Form";
import {useState} from 'react';
import Validate from "./validationRules";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import useTheme from '../../hooks/useTheme';

export default function LoginForm() {
    const {colors } = useTheme();
    const {auth, modalRef} = useAuth();
    const navigate = useNavigate();
    const [formValid, setFormValid] = useState(false);

    const changeFormValidation = (isValid) => {
        setFormValid(isValid)
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
                <TextInput placeholder="Username" name="loginusername" type="text" />
            </FormControl>

            <FormControl validations={[ Validate.isRequired(), Validate.minLength(6) ]}>
                <TextInput placeholder="Password" name="loginpassword" type="password" />
            </FormControl>

            <Button color={colors.primary.gradient.full}
            variant="contained"
            size="medium"
            boxShadow="light">Login</Button>
        </Form>
    )
}