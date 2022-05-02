import {React, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
                <h3>About</h3>
                <p>{store.about}</p>
                <h3>Meet the Team</h3>
                <div className="admins">
                    {store.admins ? store.admins.map(admin => (
                            <div key={admin._id}> {`${admin.first_name} ${admin.last_name}`}</div>
                        )) : ''}
                </div>
                <h3>Social Links</h3>
                <p> 
                    {store.social_links ? store.social_links.map(social => (
                        <a href={social.link} className="card-link" key={social.link}>{social.social_media}</a>
                    )) : ''}
                </p>
                <h3>Products</h3>
                {products.map(product => (
                    <div className='col-md-3' key={product._id}>
                        <div className='card border-secondary'>
                         <Link to={`/Product/${product._id}`}>
                            <div className='card-body'>
                                <h5 className='card-title'>{product.name}</h5>
                                <p>{product.store.name}</p>
                                <div>
                                    <p style={{ display: 'inline-block' }}>{product.tagline}</p>
                                    <p style={{ textAlign: 'right' }}>${product.cost}</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                ))}
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