import React, {useRef} from "react";
import { Link } from "react-router-dom";
import {useUserContext} from "../../context/userContext";
import './SignIn.css'

const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {signInUser, forgotPassword} = useUserContext();
    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(email && password) {
            signInUser(email, password);
        }
    };
    const forgotPasswordHandler = () => {
        const email = emailRef.current.value;
        if(email) {
            forgotPassword(email).then(() => (emailRef.current.value = ""))
        }
    };
    return (
        <div className="signIn-container">
            <h2>Login</h2>
            <form className="signIn-form" onSubmit={onSubmit}>
                <input placeholder="Email" type="email" ref={emailRef} />
                <input placeholder="Password" type="password" ref={passwordRef} />
                <button className="login-btn" type="submit">Sign In</button>
                <p onClick={forgotPasswordHandler}>Forgot Password?</p>
            </form>
            <p style={{ marginTop: "1rem" }}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default SignIn;