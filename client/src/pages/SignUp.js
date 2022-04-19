import {React, useContext} from 'react';
import SignUpForm from '../components/user-accounts/SignUpForm'
import { useHistory } from "react-router-dom";
import { UserContext } from '../App';

const SignUp = () =>{
  let history = useHistory()
  const {user} = useContext(UserContext)
  if (user) {
    history.push("/")
  }

  return (
    <div>
      <h1>Sign-up for your account!</h1>
      <SignUpForm />
    </div>
  );
}
export default SignUp;