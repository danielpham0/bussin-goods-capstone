import {React, useState} from 'react';
import "./Form.css";
import { useHistory } from "react-router-dom";

export default function  SignUpForm() {
    let history = useHistory()
    const [statusMessage, setStatusMessage] = useState('');
    let submitSignUp = async (event) => {
        event.preventDefault()
        let formData = {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirm_password: event.target.confirm_password.value
        }
        let postFormResponse = await fetch(`http://localhost:3001/api/v1/user/auth/signup`,
            {method: "POST", body: JSON.stringify(formData), headers: {'Content-Type': 'application/json'}}
        )
        let postFormJSON = await postFormResponse.json()
        if (postFormJSON.status == 'error') {
            setStatusMessage(`Error: "${postFormJSON.error}"`)
        } else {
            history.push("/")
        }
    }
    return (
        <div>
            <form className="sign-in" onSubmit={submitSignUp}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type='text' className="form-control" name='first_name' required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type='text' className="form-control" name='last_name' required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type='password' className="form-control" name='password' required/>
                    <div className="form-text">Your password must be more than 8 letters, have an uppercase letter, and a number.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label"> Confirm Password</label>
                    <input type='password' className="form-control" name='confirm_password' required/>
                    <div className="form-text">Confirm the password you entered above.</div>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                {statusMessage && <div className="form-text status"> {statusMessage} </div>}
            </form>
        </div>
    );
}