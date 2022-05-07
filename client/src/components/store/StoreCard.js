import {React} from 'react';
import { Link } from "react-router-dom";
import bannerPlaceholder from "../../imgs/bannerPlaceholder.jpg"

export default function  StoreCard(props) {
    const store = props.store
    return (
        <div className='col-md-3'>
            <div className='card border-secondary h-100' >
                <Link to={'/Startup/' + store._id}>
                    <img style={{'objectFit': 'cover', 'height': '7rem'}} className='img-fluid card-img-top' src={store.banner ? store.banner : bannerPlaceholder} />
                </Link>
                <div className='card-body' style={{'paddingBottom': '0'}}>
                    <Link to={'/Startup/' + store._id}>
                        <h5 className='card-title'>{store.name}</h5>
                    </Link>
                    <h6 className="card-subtitle mb-2 text-muted">{store.cohort} Cohort</h6>
                    <p className="card-text">{store.tagline}</p>
                    {store.social_links ? store.social_links.map(social => (
                    <a href={social.link} target="_blank" className="card-link" key={social.link}>{social.social_media}</a>
                    )) : null}
                </div>
            </div>
        </div>
    );
}