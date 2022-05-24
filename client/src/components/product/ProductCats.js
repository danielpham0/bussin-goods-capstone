import React, { useEffect } from "react";
import "./ProductCats.css";
import { STORE_TYPES } from '../../constants/constants.js';
import { Link, Route, useRouteMatch } from "react-router-dom";
import { Component } from 'react';
import ProductResults from './ProductResults.js';

export class ProductCats extends React.Component {

    state = {
        name: '',
        obj: '',
        selectedOption: '',
        test: STORE_TYPES,
        show: false,
        type: '',
        btn : false,
        items: []
    };

    findCat = (e) => {
        this.setState({ show: true, type: e.target.innerText, btn : true})
    };
    
    searchCat = (e) => {
        this.setState({ show: true, type: this.state.searchOption, btn: false })
    };


    componentDidMount() {
        this.setState({
            items: STORE_TYPES
        })
        const url = "/api/v1/product/getAllPublicProducts"

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ obj: data }))

    }

    render() {

        return (
            <div className='container border border-dark'>
                <div className="cat row no-gutters justify-content-start">
                    <div className='col-4 titl'>
                        <h5>Product Categories</h5>
                    </div>


                    <div className='col-auto browse'>

                        <div className="input-group">
                            <h5 className='browse-title'>Browse All
                            </h5>
                            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onInput={e => this.setState({ searchOption: e.target.value })} />
                            <button type="button" className="btn btn-outline-primary" onClick={this.searchCat}>search</button>
                        </div>
                    </div>
                </div>
                <div className='row'>


                    <div className='row cats'>
                        {this.state.test.map((i) => {
                            return (
                                <div className="col-md-3">
                                    <button value={i} onClick={this.findCat} key={i.id} className='btn btn-sm cat-btn btn-outline-dark btn-lg' >
                                        <h5> {i}</h5>
                                    </button>
                                </div>

                            )
                        })}
                    </div>
                    {this.state.show && <ProductResults type={this.state.type} cards={this.state.obj} btn={this.state.btn} />}
                </div>

            </div>

        )
    }
}

export default ProductCats;