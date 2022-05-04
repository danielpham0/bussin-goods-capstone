import {React} from 'react';
import { Link } from "react-router-dom";

export default function  StoreCard(props) {
    const store = props.store
    return (
        <div className='store-info'>
            <h4> Meet the Startup!</h4>
            <div className="card" style={{'width': '18rem'}}>
                <div className="card-body">
                    <Link to={'/Startup/' + store._id}>
                        <h5 className="card-title">{store.name}</h5>
                    </Link>
                    <h6 className="card-subtitle mb-2 text-muted">{store.cohort} Cohort</h6>
                    <p className="card-text">{store.tagline}</p>
                    {store.social_links ? store.social_links.map(social => (
                        <a href={social.link} className="card-link" key={social.link}>{social.social_media}</a>
                        )) : ''}
                </div>
            </div>
        </div> 
    );
}