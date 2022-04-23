import React from 'react';
import ProductPage from '../components/product/ProductPage';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {ProductCats} from '../components/product/ProductCats';

const Product = (props) =>{
  const { path } = useRouteMatch();

  return (
    <div>
      <h1>Products</h1>
      <Switch>
        <Route exact path={`${path}/`}>
          <ProductCats />
        </Route>
        <Route path={`${path}/:productID`}>
          <ProductPage addToCart={props.addToCart}/>
        </Route>
      </Switch>
    </div>
  );
}
export default Product;