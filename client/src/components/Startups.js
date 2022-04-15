import React from 'react';
import "./Startups.css";

export default function Startups() {

    return (
        <div className='container border border-dark'>
            <div class="cat row no-gutters justify-content-start">
                <div className='col-4 titl'>
                    <h5>Startup Categories</h5>
                </div>
                <div className='col-auto browse'>

                    <div class="input-group">
                        <h5 className='browse-title'>Browse All
                        </h5>
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" class="btn btn-outline-primary">search</button>
                    </div>
                </div>
            </div>
            <div className='row'>
            <div className='col-md-3'>
                        <div className='card border-primary'>
                            <div className='card-body'>
                            <h5 className='card-title'> Games</h5><br></br>
                                <p className='card-text'> Amazing food for you to try
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card border-secondary'>
                            <div className='card-body'>
                            <h5 className='card-title'> Sprots</h5><br></br>
                                <p className='card-text'> Entertainment with sports 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card border-success'>
                            <div className='card-body'>
                            <h5 className='card-title'> Home</h5><br></br>
                                <p className='card-text'> Items to improve your home
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card border-info'>
                            <div className='card-body'>
                                <h5 className='card-title'> Games</h5><br></br>
                                <p className='card-text'> Exciting games 
                                </p>
                            </div>
                        </div>
                    </div>

            </div>
        </div>


    );
}