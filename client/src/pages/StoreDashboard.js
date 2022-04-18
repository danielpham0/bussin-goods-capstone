import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import StoreSetupForm from '../components/store-dashboard/StoreSetupForm'
import Dashboard from '../components/store-dashboard/Dashboard';

const StoreDashboard = () =>{
  const { path } = useRouteMatch();
  // Check if user is an admin
  return (
    <div>
      <h3>Store Dashboard</h3>
      <Switch>
        <Route exact path={`${path}/`} component={Dashboard} />
        <Route path={`${path}/StoreSetup`} component={StoreSetupForm} />
      </Switch>
    </div>
  );
}
export default StoreDashboard;