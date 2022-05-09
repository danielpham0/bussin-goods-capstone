import {React, useContext, useState} from 'react';
import UserProfile from '../components/user-accounts/UserProfile'
import UserOrders from '../components/user-accounts/UserOrders'
import { UserContext } from '../App.js';
const Profile = () =>{
  const {user} = useContext(UserContext)
  const [consoleMode, setConsoleMode] = useState('user-profile')

  const renderSwitch = (param) => {
    if (!user) {
        return <p> Error loading the profile. You may not be logged in. </p>
    }
    switch(param) {
        case 'user-profile':
          return <UserProfile user={user} />;
        case 'user-orders':
          return <UserOrders user={user} />;
        default:
          return <p> Error loading console mode. </p>;
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <div className='console'>
            <ul className="left">
            <li className={`list-group-item list-group-item-action ${consoleMode == 'user-profile' ? 'active' : ''}`} onClick={() => setConsoleMode('user-profile')}>Your Profile</li>
              <li className={`list-group-item list-group-item-action ${consoleMode == 'user-orders' ? 'active' : ''}`} onClick={() => setConsoleMode('user-orders')}>Your Orders</li>
            </ul>
            <div className='right'>{renderSwitch(consoleMode)}</div>
        </div>
    </div>
  );
}
export default Profile;