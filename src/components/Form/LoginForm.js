import Form, {TextInput, FormControl} from "./Form";
import Validate from "./validationRules";
import useAuth from "../../hooks/useAuth";
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
            .then(() => {
                modalRef.current.closeModal();
                navigate('/dashboard')
            },
            err => {
                console.log(err);
            });
    }

    return (
        <Form onSubmit={loginUser}>
            <FormControl>
                <TextInput placeholder="Username" name="loginusername" type="text" validations={[ Validate.isRequired(), Validate.minLength(5) ]} />
            </FormControl>

            <FormControl>
                <TextInput placeholder="Password" name="loginpassword" type="password" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
            </FormControl>

            <button>test</button>
        </Form>
    )
}