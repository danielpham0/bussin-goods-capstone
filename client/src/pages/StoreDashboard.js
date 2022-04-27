import {React, useState, useEffect, useContext} from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import StoreSetupForm from '../components/store-dashboard/StoreSetupForm'
import Dashboard from '../components/store-dashboard/Dashboard';
import StoreConsole from '../components/store-dashboard/StoreConsole';
import { UserContext } from '../App';

const StoreDashboard = (props) =>{
  const history = useHistory()
  const {user} = useContext(UserContext)
  if (!user || user.account_type != 'Store Owner') {
    history.push("/")
  }

  const [stores, setStores] = useState([])
  async function fetchStores() {
    let response = await fetch(`/api/v1/store/getUserStores`,
        {method: "GET", credentials: 'include'})
    let responseJSON = await response.json()
    if (responseJSON.status == 'error') {
      props.setUser(null)
    }
    setStores(responseJSON)
  }
  useEffect(() => {
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
        <Route path={`${path}/StoreSetup`}>
          <StoreSetupForm updateStores={fetchStores}/>
        </Route>
        <Route path={`${path}/:storeID`}>
          <StoreConsole />
        </Route>
      </Switch>
    </div>
  );
}
export default StoreDashboard;