import {React} from 'react';
import profilePlaceholder from "../../imgs/profilePlaceholder.jpg"

export default function  UserCard(props) {
    const user = props.user
    return (
        <div class="card mb-3" style={{'max-width': '285px'}}>
        <div class="row g-0" >
            <div class="col-md-4">
            <img className="img-fluid rounded-circle" src={user.profile_picture ? user.profile_picture : profilePlaceholder}/>
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 className='card-title'>{`${user.first_name} ${user.last_name}`}</h5>
                <p className="text-muted">{user.role ? user.role : 'Team Member'}</p>
            </div>
            </div>
        </div>
        </div>
    );
}