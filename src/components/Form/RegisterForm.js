import Form, {TextInput} from "./Form";
import Validate from "./validationRules";
import useAuth from "../../hooks/useAuth";
import { toast } from 'react-toastify';

export default function RegisterForm() {
    const {auth} = useAuth();
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
        <Form onSubmit={registerUser}>
            <TextInput placeholder="Username" name="registerusername" type="text" validations={[ Validate.isRequired(), Validate.minLength(5) ]} />
            <TextInput placeholder="Email" name="registeremail" type="email" validations={[ Validate.isRequired(), Validate.isEmail()]} />
            <TextInput placeholder="Password" name="registerpassword" type="password" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
            <TextInput placeholder="Password" name="confirmpassword" type="password" validations={[ Validate.isRequired(), Validate.passwordMatch("registerpassword") ]} />
        </Form>
    )
}