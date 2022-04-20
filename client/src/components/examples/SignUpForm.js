import React from 'react';

export default function  SignUpForm() {
    let submitSignUp = async (event) => {
        event.preventDefault()
        let formData = {
            email: event.target.email.value,
            password: event.target.password.value,
            confirm_password: event.target.confirm_password.value
        }
        let postFormResponse = await fetch(`http://localhost:3001/api/v1/auth/signup`,
            {method: "POST", body: JSON.stringify(formData), headers: {'Content-Type': 'application/json'}}
        )
        let postFormJSON = await postFormResponse.json()
    }
    return (
        <div>
            <h1>User Sign-up</h1>
            <form onSubmit={submitSignUp}>
                <input type='text' name='email' placeholder='Email Address' required/>
                <input type='password' name='password' placeholder='Password' required/>
                <input type='password' name='confirm_password' placeholder='Confirm Password' required/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}