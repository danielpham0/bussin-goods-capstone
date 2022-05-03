import React, { useEffect } from "react";
import "./StoreCats.css";
import { STORE_TYPES } from '../../constants/constants';
import { Link } from "react-router-dom";
import { Component } from 'react';

export class StoreCats extends React.Component {

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

                    {this.state.show && <Resu type={this.state.type} cards={this.state.obj} />}

                </div>


            </div>

        )
    }
}

class Resu extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        card: [],
        type: ''
    }

    componentDidMount() {

        const url = "/api/v1/store/getAllPublicStores"

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ card: data }))
    }

    render() {
        return (
            <div className="row results">
                <h2> Showing results for: {this.props.type}</h2>

                {this.props.cards.filter(e => e.type == this.props.type).length == 0 &&

                    <p>Sorry, no results were found :/</p>

                }
                {this.props.cards.filter(e => e.type == this.props.type).map((object) => {
                    return (
                        <div className='col-md-3'>
                            <div className='card border-secondary'>
                                <Link to={`/Startup/${object._id}`}>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{object.name}</h5>
                                        <h6 className="text-muted">{object.type}</h6>

                                        <p>{object.about}</p>
                                        <p>Cohort: {object.cohort}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    )
                })}
            </div>

        )
    }
}

export default StoreCats;