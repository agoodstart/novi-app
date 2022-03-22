import Form, {TextInput} from "./Form";
import Validate from "./validationRules";

export default function RegisterForm() {
    return (
        <Form>
            <TextInput placeholder="Username" name="username" type="text" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
            <TextInput placeholder="Email" name="email" type="email" validations={[ Validate.isRequired(), Validate.isEmail()]} />
            <TextInput placeholder="Password" name="password1" type="password" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
            <TextInput placeholder="Password" name="password2" type="password" validations={[ Validate.isRequired(), Validate.passwordMatch("password1") ]} />
        </Form>
    )
}