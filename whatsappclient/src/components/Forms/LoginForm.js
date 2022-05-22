import InputForm from "./InputForm";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './MainContainer.css';
import './forms.css';
import { LoginCheck } from "../../DBAdapater";
import $ from 'jquery';


export default function LoginForm({ setActiveUser }) {

    let navigate = useNavigate();
    const [invalidMessage, setInvalidMessage] = useState('');

    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    let hiding = true;

    useEffect(() => {
        if (usernameValue === '' || passwordValue === '') {
            $('#loginSubmit').prop('disabled', true);
        } else {
            $('#loginSubmit').prop('disabled', false);
        }
    });

    const displayPass = () => {
        if (hiding) {
            $('#login-password').prop('type', 'text');
            $('#eye').html('<i class="bi bi-eye-slash"></i>');
            hiding = !hiding;
        } else {
            $('#login-password').prop('type', 'password');
            $('#eye').html('<i class="bi bi-eye"></i>');
            hiding = !hiding;
        }
    }

    const Login = function (element) {
        element.preventDefault();

        if (LoginCheck(usernameValue, passwordValue)) {
            setActiveUser(usernameValue);
            navigate('/chats');
        } else {
            setInvalidMessage("Invalid username or password.");
            $('#loginContainer').addClass('red-border');
            setTimeout(() => { 
                $('#loginContainer').removeClass('red-border');
                setInvalidMessage("");
            }, 4500);
        }
    }

    return (
        <div id='loginContainer' className="mainContainer">
            <form className="w-45" onSubmit={Login}>
                <div className="welcomeText" > Sign in </div>
                <InputForm id={"login-username"} placeholder={"Username"} type="text" max='12' setter={(e) => { setUsernameValue(e) }} />
                <span id='eyeContainer'>
                    <InputForm id={"login-password"} placeholder={"Password"} type="password" max='22' setter={(e) => { setPasswordValue(e) }} />
                    <span id="eye" onClick={displayPass}><i className="bi bi-eye" /></span>
                </span>
                <div className="invalidMessage mb-1">{invalidMessage}</div>
                <button id='loginSubmit' type="submit" className="mainButton w-75 btn" >Sign in</button>
                <div className="mb-3 white-text">Not registered? <Link to="/register">Register</Link>.</div>
            </form>
        </div>
  );
}
