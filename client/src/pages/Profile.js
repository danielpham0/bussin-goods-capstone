import {React, useEffect, useState} from 'react';
import LogoutButton from '../components/user-accounts/LogoutButton.js'
import { useHistory } from "react-router-dom";
const Profile = () =>{
  let history = useHistory()
  let [user, setUser] = useState()
  useEffect(() => {
      async function fetchUser() {
          let response = await fetch(`http://localhost:3001/api/v1/user/getUserIdentity`,
              {method: "GET", credentials: 'include'})
          let responseJSON = await response.json()
          if (responseJSON.status == 'error') {
            history.push("/")
          } else {
            setUser(responseJSON)
          }
      }
      fetchUser()
    }, [])
  return (
    <div>
      <h1>Profile</h1>
      {user ? <div>Hello {user.first_name}!</div> : null}
      <LogoutButton />
    </div>
  );
}
export default Profile;