import {React, useState} from 'react';
import './UserProfile.css'
import LogoutButton from './LogoutButton';
import profilePlaceholder from "../../imgs/profilePlaceholder.jpg"

export default function  UserProfile(props) {
    const user = props.user
    const [statusMessage, setStatusMessage] = useState('');

    let submitProfilePicture = async (event) => {
        event.preventDefault()
        let file = event.target.profile_picture.files[0]
        if (file){
            const urlResponse = await fetch('/api/v1/s3/getUploadUrl')
            const urlJSON = await urlResponse.json()
            const f = await fetch(urlJSON.upload_url, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: file
            });
            let formData = {
                userID: user._id,
                updatedUser: {
                    profile_picture: urlJSON.upload_url.split('?')[0]
                }
            }
            let postFormResponse = await fetch(`/api/v1/user/updateUser`,
                {method: "POST", body: JSON.stringify(formData), headers: {'Content-Type': 'application/json', 
                }, credentials: 'include'}
            )
            let postFormJSON = await postFormResponse.json()
            if (postFormJSON.status == 'error') {
                setStatusMessage(`Error: "${postFormJSON.error}"`)
            } else {
                setStatusMessage("Success! Please reload page to view new profile picture.")
            }
        } else {
            setStatusMessage("Error: Please select a file.")
        }
    }

    return (
        <div>
            <h3> Hello {user.first_name}! </h3>
            <div className='user-profile-content'>
                <h4> User Information </h4>
                <div> <strong>Name:</strong> {`${user.first_name} ${user.last_name}`}</div>
                <div> <strong>Email:</strong> {user.email} </div>
                <div> <strong>Account Type:</strong> {user.account_type} </div>
                <br/>
                <h4> Edit Profile Picture </h4>
                <form onSubmit={submitProfilePicture}>
                    <div className="mb-3">
                        <div className="row align-items-center"> 
                            <div className="col-md-2">
                                <img className="img-fluid rounded-circle" style={{'width': 'auto', 'height':'auto', 'objectFit':'cover'}} src={user.profile_picture ? user.profile_picture : profilePlaceholder}/></div>
                            <div className="col-md-8">
                                <label className="form-label">What would you like to change your profile picture to? </label>
                                <input className="form-control" type="file" name="profile_picture" accept="image/png, image/jpeg, image/jpg" single="true"></input>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Change Profile Picture</button>
                    {statusMessage && <div className="form-text status"> {statusMessage} </div>}
                </form>
                <br/>
                <h4> Sign out </h4>
                <LogoutButton />
            </div>
        </div>
    );
}