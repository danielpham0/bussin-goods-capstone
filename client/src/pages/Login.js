import {React, useContext} from 'react';
import LoginForm from '../components/user-accounts/LoginForm'
import { useHistory } from "react-router-dom";
import { UserContext } from '../App';

const Login = () =>{
  let history = useHistory()
  const {user} = useContext(UserContext)
  if (user) {
    history.push("/")
  }
  
  return (
    <div>
      <h1>Login to your account!</h1>
      <LoginForm/>
    </div>
  );
}
export default Login;