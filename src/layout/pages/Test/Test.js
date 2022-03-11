import Form, { Input } from "../../components/Form/Form";

export default function Test() {
  console.log('Test page rendered');
    return (
      <Form>
        <Input
          placeholder="Username"
          type="text"
          name="username" />
        <div className="">
          is this allowed?
        </div>
      </Form>
    );
  }