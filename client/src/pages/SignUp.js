import {React, useEffect} from 'react';
import SignUpForm from '../components/user-accounts/SignUpForm'
import { useHistory } from "react-router-dom";

const SignUp = () =>{
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
      <h1>Sign-up for your account!</h1>
      <SignUpForm />
    </div>
  );
}
export default SignUp;