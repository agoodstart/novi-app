import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const user = useOutletContext();

  console.log('Profile page rendered');
    return (
      <h2>welcome {user}!</h2>
    );
  }