import {React, useContext} from 'react';
import LogoutButton from '../components/user-accounts/LogoutButton.js'
import { useHistory } from "react-router-dom";
import { UserContext } from '../App.js';
const Profile = () =>{
  let history = useHistory()
  const {user} = useContext(UserContext)
  if (!user) {
    history.push("/")
  }

  return (
    <div>
      <h1>Profile</h1>
      {user ? <div>Hello {user.first_name}!</div> : null}
      <LogoutButton />
    </div>
  );
}
export default Profile;