import {React, useEffect, useState} from 'react';
import "./StoreConsole.css"
import { Link, useParams } from "react-router-dom";
import AddProduct from './AddProduct';

export default function  StoreConsole(props) {
    let {storeID} = useParams()
    const [store, setStore] = useState()
    const [consoleMode, setConsoleMode] = useState('analytics')

    useEffect(() => {
        if (props.stores && props.stores.length > 0) {
            let store = props.stores.filter(store => store._id == storeID)
            setStore(store ? store[0] : null)
        }
    }, [props.stores])
    const renderSwitch = (param) => {
        if (!store) {
            return <p> Error loading the store. </p>
        }
        switch(param) {
            case 'analytics':
              return <p> Analytics </p>;
            case 'manage-store':
              return <p> Manage Store </p>;
            case 'manage-product':
              return <p> Manage Product </p>;
            case 'add-product':
              return <AddProduct store={store}/>;
            default:
              return <p> Error loading console mode. </p>;
        }
    }
    return (
        <div className='console'>
            <ul className="left">
                <li className={`list-group-item list-group-item-action ${consoleMode == 'analytics' ? 'active' : ''}`} onClick={() => setConsoleMode('analytics')}>Store Analytics</li>
                <li className={`list-group-item list-group-item-action ${consoleMode == 'manage-store' ? 'active' : ''}`} onClick={() => setConsoleMode('manage-store')}>Manage Store</li>
                <li className={`list-group-item list-group-item-action ${consoleMode == 'manage-product' ? 'active' : ''}`} onClick={() => setConsoleMode('manage-product')}>Manage Products</li>
                <li className={`list-group-item list-group-item-action ${consoleMode == 'add-product' ? 'active' : ''}`} onClick={() => setConsoleMode('add-product')}>Add a Product</li>
            </ul>
            <div className='right'>{renderSwitch(consoleMode)}</div>
        </div>
    );
}