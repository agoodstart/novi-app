import Form, {TextInput} from "./Form";
import Validate from "./validationRules";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const {auth, modalRef} = useAuth();
    const navigate = useNavigate();

    const loginUser = (data) => {
        const credentials = {
            username: data.loginusername,
            password: data.loginpassword,
        }

        auth.signin(credentials)
            .then(data => {
                console.log(data);
                modalRef.current.closeModal();
                navigate('/profile')
            },
            err => {
                console.log(err);
            });
    }

    return (
        <Form onSubmit={loginUser}>
            <TextInput placeholder="Username" name="loginusername" type="text" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
            <TextInput placeholder="Password" name="loginpassword" type="password" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
        </Form>
    )
}