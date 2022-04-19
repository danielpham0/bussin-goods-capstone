import React from 'react';
import Categories from '../components/Categories';
import ProductPage from '../components/product/ProductPage';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const Product = () =>{
  const { path } = useRouteMatch();

  return (
    <div>
      <h1>Products</h1>
      <Switch>
        <Route exact path={`${path}/`}>
          <Categories />
        </Route>
        <Route path={`${path}/:productID`}>
          <ProductPage />
        </Route>
      </Switch>
    </div>
  );
}
export default Product;