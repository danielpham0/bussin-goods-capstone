import React from 'react';
import "./Categories.css";
import { STORE_TYPES } from '../constants/constants';
import { Link } from "react-router-dom";

export default function Categories() {

    const Card = ({
        title = "Default"
    }) => (

        <div className='col-md-3' >
            <Link to={'/products/' + title}>
                <div className='card border-secondary'>
                    <div className='card-body'>
                        <h5 className='card-title'> {title}</h5>
                    </div>
                </div>
            </Link>
        </div>

    )

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


                <div className='row'>
                    {STORE_TYPES.map(function (store, index) {
                        return <Card title={store} {...index} />
                    })}
                </div>



            </div>
        </div>


    );
}