import {React, useEffect, useState} from 'react';
import "./StoreConsole.css"
import { useParams } from "react-router-dom";
import AddProduct from './AddProduct';
import ManageStore from './ManageStore';
import ManageProduct from './ManageProduct';

export default function  StoreConsole(props) {
    let {storeID} = useParams()
    const [store, setStore] = useState()
    const [consoleMode, setConsoleMode] = useState('manage-store')

    useEffect(() => {
      async function fetchStore() {
        let response = await fetch(`/api/v1/store/getStore?storeID=${storeID}`,
            {method: "GET", credentials: 'include'})
        let responseJSON = await response.json()
        if (responseJSON.status != 'error'){
            setStore(responseJSON)
        }
      }
      fetchStore()
    }, [])
    const renderSwitch = (param) => {
        if (!store) {
            return <p> Error loading the store. </p>
        }
        switch(param) {
            case 'analytics':
              return <div> <h3> Analytics </h3> <p>Work in progress...</p></div>;
            case 'manage-store':
              return <ManageStore store={store}/>;
            case 'manage-product':
              return <ManageProduct />;
            case 'add-product':
              return <AddProduct store={store}/>;
            default:
              return <p> Error loading console mode. </p>;
        }
    }
    return (
        <div className='console'>
            <ul className="left">
            <li className={`list-group-item list-group-item-action ${consoleMode == 'manage-store' ? 'active' : ''}`} onClick={() => setConsoleMode('manage-store')}>Manage Store</li>
              <li className={`list-group-item list-group-item-action ${consoleMode == 'manage-product' ? 'active' : ''}`} onClick={() => setConsoleMode('manage-product')}>Manage Products</li>
              <li className={`list-group-item list-group-item-action ${consoleMode == 'add-product' ? 'active' : ''}`} onClick={() => setConsoleMode('add-product')}>Add a Product</li>
              <li className={`list-group-item list-group-item-action ${consoleMode == 'analytics' ? 'active' : ''}`} onClick={() => setConsoleMode('analytics')}>Store Analytics</li>
            </ul>
            <div className='right'>{renderSwitch(consoleMode)}</div>
        </div>
    );
}