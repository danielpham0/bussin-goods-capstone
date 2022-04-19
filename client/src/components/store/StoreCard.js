import {React} from 'react';
import { Link } from "react-router-dom";

export default function  StoreCard(props) {
    const store = props.store
    console.log(store)
    return (
        <div className='store-info'>
            <h4> Meet the Startup!</h4>
            <div className="card" style={{'width': '18rem'}}>
                <Link to={'/Store/' + store._id}>
                    <div className="card-body">
                        <h5 className="card-title">{store.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{store.cohort} Cohort</h6>
                        <p className="card-text">{store.tagline}</p>
                        {store.social_links ? store.social_links.map(social => (
                            <a href={social.link} className="card-link" key={social.link}>{social.social_media}</a>
                        )) : ''}
                    </div>
                </Link>
            </div>
        </div> 
    );
}