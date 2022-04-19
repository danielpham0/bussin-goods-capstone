import React, { useEffect } from "react";
import "./Categories.css";
import { STORE_TYPES } from '../constants/constants';
import { Link } from "react-router-dom";
import { Component } from 'react';

export default function Categories() {
    const dats = []
    useEffect(() => {
        const url = "http://localhost:3001/api/v1/store/getAllPublicStores";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                dats.push(json)
                console.log(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    const findCat = (parameter) => (event) => {
        console.log(dats.filter(x => x.type = parameter))
        let doc = document.getElementById('prods');
        let element = document.createElement('div');
        element.className = "col-md-3"
        let ele2 = document.createElement('div');
        ele2.className = "card border-secondary"
        let ele3 = document.createElement('div');
        ele3.className = 'card-body'
        let h5 = document.createElement('h5')
        h5.className = 'card-title'
        h5.innerHTML = parameter

        element.appendChild(ele2)
        ele2.appendChild(ele3)
        ele3.appendChild(h5)
        console.log(element)
        doc.innerHTML  = element.innerHTML
    }

    const Card = ({
        type = "Default"
    }) => (
        <div onClick={findCat({ type })} className='col-md-3' >
            <div className='card border-secondary'>
                <div className='card-body'>
                    <h5 className='card-title'> {type}</h5>
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
                        return <Card type={store} {...index} />
                    })}
                </div>

                <div id='prods'>

                </div>


            </div>
        </div>


    );
}

