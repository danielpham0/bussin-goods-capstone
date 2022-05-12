import {React, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductCard from '../product/ProductCard';
import UserCard from '../user-accounts/UserCard';
import './StorePage.css'

export default function ProductPage(props) {
    let {storeID} = useParams()
    const [products, setProducts] = useState()
    const [store, setStore] = useState()
    const [statusMessage, setStatusMessage] = useState('')

    useEffect(() => {
        async function fetchStore() {
            let response = await fetch(`/api/v1/store/getStore?storeID=${storeID}`,
            {method: "GET", credentials: 'include'})
            let responseJSON = await response.json()
            if (responseJSON.status != 'error') {
                setStore(responseJSON)
            }
            else {
                setStatusMessage(responseJSON.error)
            }
            console.log(responseJSON)
        }
        async function fetchProducts() {
            let response = await fetch(`/api/v1/product/getStoreProducts?storeID=${storeID}`,
                {method: "GET", credentials: 'include'})
            let responseJSON = await response.json()
            if (responseJSON.status != 'error') {
                setProducts(responseJSON)
            }
            else {
                setStatusMessage(responseJSON.error)
            }
            console.log(responseJSON)
        }
        fetchStore()
        fetchProducts()
    }, [])

    let storeHtml = () => {
        return (
            <div className="store-page">
                <h2>{store.name}</h2>
                <h3>Our Products</h3>
                <div className='product-cards row'>
                    {products.map(product => (
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </div>
                <h3>About Us</h3>
                <p>{store.about}</p>
                <br/>
                <h4>Meet the Team</h4>
                <div className="team-cards row">
                    {store.admins ? store.admins.map(admin => (
                        <UserCard key={admin._id} user={admin}/>
                        )) : ''}
                </div>
                <h3>Social Links</h3>
                <div className='social-link'> 
                    {store.social_links ? store.social_links.map(social => (
                        <a href={social.link} className="card-link" key={social.link}>{social.social_media}</a>
                    )) : ''}
                </div>
                <br/>
            </div>
        )
    }
    return (
        <div>
            {products && store ? storeHtml() : <div> <p>Could not load store properly.</p>
            {statusMessage && <div className="alert alert-danger"> Error: {statusMessage} </div>} </div>}
        </div>
    );
}