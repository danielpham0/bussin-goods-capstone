import {React, useState} from 'react';
import "./Form.css";
import { useHistory } from "react-router-dom";

export default function  LogoutButton() {
    let history = useHistory()
    let onClick = async () => {
        let response = await fetch(`http://localhost:3001/api/v1/user/auth/logout`,
            {method: "GET", credentials: 'include'}
        )
        let responseJSON = await response.json()
        console.log(responseJSON)
        history.push("/")
    }
    return (
        <button type="submit" className="btn btn-primary" onClick={(onClick)}>Logout</button>
    );
}