import {React} from 'react';
import { Link } from "react-router-dom";

export default function  Dashboard() {
    return (
        <div>
            <p>Please setup your store or ask your partner to add you to the store they have setup.</p>
            <Link to="/StoreDashboard/StoreSetup">Setup Store</Link>
        </div>
    );
}