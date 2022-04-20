import {React, useState} from 'react';
import "./Form.css";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function  LoginForm() {
    let history = useHistory()
    const [statusMessage, setStatusMessage] = useState('');
    let submitLogin = async (event) => {
        event.preventDefault()
        let formData = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        let postFormResponse = await fetch(`http://localhost:3001/api/v1/user/auth/login`,
            {method: "POST", body: JSON.stringify(formData), headers: {'Content-Type': 'application/json'}, credentials: 'include',}
        )
        let postFormJSON = await postFormResponse.json()
        if (postFormJSON.status == 'error') {
            setStatusMessage(`Error: "${postFormJSON.error}"`)
        } else {
            history.push("/")
            history.go(0)
        }
    }
    return (
        <div>
            <form className="sign-in" onSubmit={submitLogin}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type='password' className="form-control" name='password' required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {statusMessage && <div className="form-text status"> {statusMessage} </div>}
            </form>
            <div className='sign-up-link'><Link  to='/Signup'>Signup for an account here.</Link> </div>
        </div>
    );
}