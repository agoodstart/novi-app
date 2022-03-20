import Form, { TextInput, EmailInput } from "../../components/Form/Form";
import { registerReducer } from "../../../utils/reducers";
import Validate from "../../components/Form/validationRules";

export default function Test() {
  console.log('Test page rendered');
    return (
      <Form reducer={registerReducer}>
        <h3>Is this allowed?</h3>
        <TextInput
          placeholder="Username"
          name="username"
          validations={[
            Validate.isRequired(),
            Validate.minLength(6)
          ]}
        />
      </Form>
    );
  }