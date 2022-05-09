import {React} from 'react';
import profilePlaceholder from "../../imgs/profilePlaceholder.jpg"

export default function  UserCard(props) {
    const user = props.user
    return (
        <div className="card mb-3" style={{'maxWidth': '285px'}}>
        <div className="row g-0" >
            <div className="col-md-4">
            <img className="img-fluid rounded-circle" style={{'width': '100%', 'height':'100%', 'objectFit':'cover'}} src={user.profile_picture ? user.profile_picture : profilePlaceholder}/>
            </div>
            <div className="col-md-8">
            <div className="card-body">
                <h5 className='card-title'>{`${user.first_name} ${user.last_name}`}</h5>
                <p className="text-muted">{user.account_type}</p>
            </div>
            </div>
        </div>
        </div>
    );
}