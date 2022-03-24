import Form, {TextInput} from "./Form";
import Validate from "./validationRules";

export default function LoginForm() {
    return (
        <Form>
            <TextInput placeholder="Username" name="loginusername" type="text" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
            <TextInput placeholder="Password" name="loginpassword" type="password" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
        </Form>
    )
}