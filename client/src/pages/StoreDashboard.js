import {React, useState, useEffect} from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StoreSetupForm from '../components/store-dashboard/StoreSetupForm'
import Dashboard from '../components/store-dashboard/Dashboard';
import StoreConsole from '../components/store-dashboard/StoreConsole';

const StoreDashboard = () =>{
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
  // Check if user is an admin
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