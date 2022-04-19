import {React, useEffect} from 'react';
import LoginForm from '../components/user-accounts/LoginForm'
import { useHistory } from "react-router-dom";

const Login = () =>{
  let history = useHistory()
  useEffect(() => {
      async function fetchUser() {
          let response = await fetch(`http://localhost:3001/api/v1/user/getUserIdentity`,
              {method: "GET", credentials: 'include'})
          let responseJSON = await response.json()
          if (responseJSON.status != 'error') {
            history.push("/")
          }
      }
      fetchUser()
    }, [])
  return (
    <div>
      <h1>Login to your account!</h1>
      <LoginForm/>
    </div>
  );
}
export default Login;