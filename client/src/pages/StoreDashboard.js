import {React, useState, useEffect, useContext} from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StoreSetupForm from '../components/store-dashboard/StoreSetupForm'
import Dashboard from '../components/store-dashboard/Dashboard';
import StoreConsole from '../components/store-dashboard/StoreConsole';
import { UserContext } from '../App';

const StoreDashboard = () =>{
  const {user} = useContext(UserContext)
  if (!user || user.account_type != 'Store Owner') {
    history.push("/")
  }

  const [stores, setStores] = useState([])
  useEffect(() => {
        async function fetchStores() {
            let response = await fetch(`http://localhost:3001/api/v1/store/getUserStores`,
                {method: "GET", credentials: 'include'})
            let responseJSON = await response.json()
            setStores(responseJSON)
            console.log(responseJSON)
        }
        fetchStores()
    }, [])
  const { path } = useRouteMatch();
  return (
    <div>
      <h1>Store Dashboard</h1>
      <Switch>
        <Route exact path={`${path}/`}>
          <Dashboard stores={stores}/>
        </Route>
        <Route path={`${path}/StoreSetup`} component={StoreSetupForm} />
        <Route path={`${path}/:storeID`}>
          <StoreConsole stores={stores}/>
        </Route>
      </Switch>
    </div>
  );
}
export default StoreDashboard;