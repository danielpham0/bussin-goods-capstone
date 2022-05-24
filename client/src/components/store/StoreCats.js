import React, { useEffect } from "react";
import "./StoreCats.css";
import { STORE_TYPES } from '../../constants/constants';
import { Link } from "react-router-dom";
import { Component } from 'react';
import StoreCard from './StoreCard.js';

export class StoreCats extends React.Component {

    state = {
        name: '',
        obj: '',
        searchOption: '',
        test: STORE_TYPES,
        show: false,
        btn: false,
        type: '',
        items: []
    };

    findCat = (e) => {
        this.setState({ show: true, type: e.target.innerText, btn: true })
    };

    searchCat = (e) => {
        this.setState({ show: true, type: this.state.searchOption, btn: false })
    };


    componentDidMount() {
        this.setState({
            items: STORE_TYPES
        })
        const url = "/api/v1/store/getAllPublicStores"

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ obj: data }))

    }

    render() {

        return (
            <div className='container border border-dark'>
                <div className="cat row no-gutters justify-content-start">
                    <div className='col-4 titl'>
                        <h5>Startup Categories</h5>
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
                                <div className="col-md-3" key={i}>
                                    <button value={i} onClick={this.findCat} className='btn btn-sm cat-btn btn-outline-dark btn-lg' >
                                        <h5> {i}</h5>
                                    </button>
                                </div>

                            )
                        })}
                    </div>

                    {this.state.show && <Results type={this.state.type} cards={this.state.obj} btn={this.state.btn} />}

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
        type: '',
        btn: false
    }

    componentDidMount() {

        const url = "/api/v1/store/getAllPublicStores"

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ card: data }))
    }

    render() {
        const bntfiltered = this.props.cards.filter(e => e.type == this.props.type)

        const filtered = this.props.cards.filter(
            e => {
            var inp = this.props.type.toLowerCase()
            return (
                e.name.toLowerCase().includes(inp) ||
                e.type.toLowerCase().includes(inp) ||
                e.tagline.toLowerCase().includes(inp)
            )
            }
        )

        return (
            <div className="row results">
                <h2> Showing results for: {this.props.type}</h2>
                {this.props.btn == true ? (
                    bntfiltered.length == 0 ?
                        <p>Sorry, no results were found :/</p>
                        : (
                            bntfiltered.map((object) => {
                                return (
                                    <StoreCard key={object._id} store={object} />
                                )
                            }))) : (
                                filtered.length == 0 ?
                        <p>Sorry, no results were found :/</p>
                        : (
                            filtered.map((object) => {
                                return (
                                    <StoreCard key={object._id} store={object} />
                                )
                            }))
                )
                }

            </div>

        )
    }
}

export default StoreCats;