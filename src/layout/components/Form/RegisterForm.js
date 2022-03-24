import Form, {TextInput} from "./Form";
import Validate from "./validationRules";

export default function RegisterForm() {
    return (
        <Form>
            <TextInput placeholder="Username" name="registerusername" type="text" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
            <TextInput placeholder="Email" name="registeremail" type="email" validations={[ Validate.isRequired(), Validate.isEmail()]} />
            <TextInput placeholder="Password" name="registerpassword" type="password" validations={[ Validate.isRequired(), Validate.minLength(6) ]} />
            <TextInput placeholder="Password" name="confirmpassword" type="password" validations={[ Validate.isRequired(), Validate.passwordMatch("registerpassword") ]} />
        </Form>
    )
}