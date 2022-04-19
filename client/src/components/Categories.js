import React from 'react';
import "./Categories.css";
import { STORE_TYPES } from '../constants/constants';
import { Link } from "react-router-dom";
import { Component } from 'react';

export default function Categories() {


    const dats = []
    let fetchData = () => {
        fetch(`http://localhost:3001/api/v1/store/getAllPublicStores`)
            .then(response => response.json())
            .then(data => dats.push(data))
        console.log(dats)

        var obj = dats.reduce(function (acc, cur, i) {
            acc[i] = cur;
            return acc;
        }, {});

        console.log(obj)

        dats.forEach(function (x) {
            console.log(x[0].name)

        })

        let doc = document.getElementById('prods')

        let ah = dats.map(function (store) {
            console.log(store)
            return <Prod name={store}/>
        })
        
        console.log(ah)

    };


const Card = ({
    title = "Default"
}) => (
    <div onClick={fetchData} className='col-md-3' >
        <div className='card border-secondary'>
            <div className='card-body'>
                <h5 className='card-title'> {title}</h5>
            </div>
        </div>
    </div>

)

const Prod = ({
    name = 'Default',
    cohort = 'X',
    type = 'C'
}) => (
    <div className='col-md-3' >
        <div className='card border-secondary'>
            <div className='card-body'>
                <h5 className='card-title'> {name}</h5>
            </div>
        </div>
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


            <div className='row cats'>
                {STORE_TYPES.map(function (store, index) {
                    return <Card title={store} {...index} />
                })}
            </div>

            <div id='prods'>

            </div>


        </div>
    </div>


);
}

