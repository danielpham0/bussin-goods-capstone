import React from 'react';

export default function  LoginForm() {
    let submitLogin = async (event) => {
        event.preventDefault()
        let formData = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        let postFormResponse = await fetch(`http://localhost:3001/api/v1/auth/login`,
            {method: "POST", body: JSON.stringify(formData), headers: {'Content-Type': 'application/json'}}
        )
        let postFormJSON = await postFormResponse.json()
        console.log(postFormJSON)
    }
    return (
        <div>
            <h2>User Login</h2>
            <form onSubmit={submitLogin}>
                <input type='text' name='email' placeholder='Email Address' required/>
                <input type='password' name='password' placeholder='Password' required/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}