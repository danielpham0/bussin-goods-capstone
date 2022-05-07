import React from 'react';
import "./Featured.css";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ProductCard from '../product/ProductCard.js';
import StoreCard from '../store/StoreCard.js';

export class FeatTest extends React.Component {

    state = {
        store: [],
        prods: [],
    };



    componentDidMount() {

        const urlStore = "/api/v1/store/getAllPublicStores"
        const urlProd = "/api/v1/product/getAllPublicProducts"

        fetch(urlStore)
            .then(response => response.json())
            .then(data => this.setState({ store: data }))

        fetch(urlProd)
            .then(response => response.json())
            .then(data => this.setState({ prods: data }))


    }

    render() {
        
        function getMultipleRandom(arr, num) {
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
          
            return shuffled.slice(0, num);
          }
          
        return (
            <div className='container border box'>
                <div className="feat">
                    <div className='feat-head'>
                        <h5 className='feat-title'>Featured Startups
                            <Link to={'/Startup/'}>
                                <p className='more'>More...</p>
                            </Link>
                        </h5>
                    </div>
                    <div className='row justify-content-center'>
                        {getMultipleRandom(this.state.store,3).map((i) => {
                            return (
                                <StoreCard key={i._id} store={i} />
                            )
                        })}
                    </div>

                    <div className='feat-head'>
                        <h5 className='feat-title'>Featured Products
                            <Link to={'/Product/'}>
                                <p className='more'>More...</p>
                            </Link> </h5>
                    </div>
                    <div className='row justify-content-center'>
                        {getMultipleRandom(this.state.prods,3).map((i) => {
                            return (
                                <ProductCard key={i._id} cards={i} />
                            )
                        })}
                    </div>
                </div>
            </div>


        );

    }
}

export default FeatTest;

