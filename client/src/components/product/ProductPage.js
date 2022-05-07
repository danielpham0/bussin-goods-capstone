import {React, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import ImageCarousel from './ImageCarousel';
import ProductOrderForm from './ProductOrderForm';
import AboutProduct from './AboutProduct';
import StoreCard from '../store/StoreCard';
import './ProductPage.css'

export default function ProductPage(props) {
    let {productID} = useParams()
    const [product, setProduct] = useState()
    useEffect(() => {
            async function fetchProduct() {
                let response = await fetch(`/api/v1/product/getProduct?productID=${productID}`,
                    {method: "GET", credentials: 'include'})
                let responseJSON = await response.json()
                setProduct(responseJSON)
            }
            fetchProduct()
        }, [])

    let productHtml = () => {
        return (
            <div className="product-page">
                <h2>{product.store.name}</h2>
                <div className='product-section section'>
                    <ImageCarousel imageUrls={product.pictures}/>
                    <ProductOrderForm product={product} addToCart={props.addToCart}/>
                </div>
                <div className='section'>
                    <AboutProduct product={product} />
                </div>
                <div className='section'>
                    <div className='store-info'>
                        <h4> Meet the Startup!</h4>
                        <div className='row justify-content-center'>
                            <StoreCard store={product.store} />
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
    return (
        <div>
            {product ? productHtml() : <p>Could not load product properly.</p>}
        </div>
    );
}