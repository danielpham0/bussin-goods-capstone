import React, { useEffect } from "react";
import "./Categories.css";
import { STORE_TYPES } from '../constants/constants';
import { Link } from "react-router-dom";
import { Component } from 'react';

export class Cats extends React.Component {

    state = {
        name: '',
        obj: '',
        selectedOption: '',
        test: STORE_TYPES,
        show: false,
        type: '',
        items: []
    };

    findCat = (e) => {
        this.setState({ show: true, type: e.target.innerText })
    };

    componentDidMount() {
        this.setState({
            items: STORE_TYPES
        })
        const url = "http://localhost:3001/api/v1/product/getAllPublicProducts"

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
                            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                            <button type="button" className="btn btn-outline-primary">search</button>
                        </div>
                    </div>
                </div>
                <div className='row'>


                    <div className='row cats'>
                        {this.state.test.map((i) => {
                            return (
                                <div value={i} onClick={this.findCat} key={i.id} className='col-md-3' >
                                    <div className='card border-secondary'>
                                        <div className='card-body'>
                                            <h5 className='card-title'> {i}</h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {this.state.show && <Results type={this.state.type} cards={this.state.obj} />}

                </div>


            </div>

        )
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        card: [],
        type: ''
    }

    componentDidMount() {

        const url = "http://localhost:3001/api/v1/store/getAllPublicStores"

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ card: data }))
    }

    render() {
        const { cat } = this.props.cards
        console.log
        this.props.cards.filter(e => e.type == "Food").forEach(e => console.log(e))
        return (

            <div className="row">
                {this.props.cards.filter(e => e.type == this.props.type).map((object) => {
                    return (
                        <div className='col-md-3'>
                            <div className='card border-secondary'>
                                <div className='card-body'>

                                    <h5 className='card-title'>{object.name}{console.log(object, ' hi')}</h5>
                                    

                                    <p>{object.store.name}</p>
                                    <text>
                                    <p style={{display: 'inline-block'}}>{object.tagline}</p>
                                    <p style={{textAlign: 'right'}}>{object.cost}</p>
                                    </text>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>

        )
    }
}

export default Cats;