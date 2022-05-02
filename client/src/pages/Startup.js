import React from 'react';
import StorePage from '../components/store/StorePage';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {StoreCats} from '../components/store/StoreCats';

const Startup = () =>{
  const { path } = useRouteMatch();
  return (
    <div>
      <h1>Startups</h1>
      <Switch>
        <Route exact path={`${path}/`}>
          <StoreCats/>
        </Route>
        <Route path={`${path}/:storeID`}>
          <StorePage />
        </Route>
      </Switch>
    </div>
  );
}
export default Startup;