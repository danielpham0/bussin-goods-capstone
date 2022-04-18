import {React} from 'react';
import './Dashboard.css'
import { Link } from "react-router-dom";

export default function  Dashboard(props) {
    let stores = props.stores;
    return (
        <div className='store-select'>
            {stores.length <= 0 ? <p>Please setup a new store or have your partner add you to an existing store.</p> : null}
            <ul className="list-group">
                {stores.length > 0 ? stores.map(store => <Link to={`/StoreDashboard/${store._id}`} key={store._id}> 
                    <li className="list-group-item list-group-item-action">{`${store.name} (${store.cohort}) ` }</li></Link> ) : null}
                <Link to="/StoreDashboard/StoreSetup"> <li className='list-group-item list-group-item-action list-group-item-dark'> Setup a New Store</li></Link> 
            </ul>
        </div>
    );
}