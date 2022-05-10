import {React, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import ProductCard from '../product/ProductCard';

export default function  ManageProduct(props) {
    let {storeID} = useParams()
    const [products, setProducts] = useState()

    useEffect(() => {
        async function fetchProducts() {
          let response = await fetch(`/api/v1/product/getStoreProducts?storeID=${storeID}`,
              {method: "GET", credentials: 'include'})
          let responseJSON = await response.json()
          if (responseJSON.status != 'error'){
              setProducts(responseJSON)
          }
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <h3>Your Products</h3>
            <div className='row'>
                {products ? products.map(product => <ProductCard key={product._id} product={product} manage={true} /> ) : "No Products."}
            </div>
        </div>
    );
}