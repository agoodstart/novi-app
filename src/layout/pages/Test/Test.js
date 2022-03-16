import Form, { Input } from "../../components/Form/Form";
import { registerReducer } from "../../../utils/reducers";

export default function Test() {
  console.log('Test page rendered');
    return (
      <Form reducer={registerReducer}>
        <h3>Is this allowed?</h3>
        <Input
          placeholder="Username"
          type="text"
          name="username" />
      </Form>
    );
  }