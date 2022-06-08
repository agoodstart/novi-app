import {useEffect} from 'react';
import LoginForm from '../../components/Form/LoginForm';

export default function Test() {
  useEffect(() => {
    console.log('test page rendered');
  })
    return (
      <LoginForm />
    );
  }