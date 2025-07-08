import React, {useRef} from "react";
import { Link } from "react-router-dom";
import {useUserContext} from "../../context/userContext";
import '../signIn/SignIn.css';


const SignUp = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const { registerUser } = useUserContext();
    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const password = passwordRef.current.value;
        if (email && name && password) {
            registerUser(email, name, password);
        }
    };
    return (
        <div className="signIn-container">
            <h2>New User</h2>
            <form className="signIn-form" onSubmit={onSubmit}>
                <input placeholder="Email" type="email" ref={emailRef} />
                <input placeholder="Name" type="name" ref={nameRef} />
                <input placeholder="Password" type="password" ref={passwordRef} />
                <button type="submit">Sign Up</button>
            </form>
            <p style={{ marginTop: "1rem" }}>
                Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </div>
    );
};

export default SignUp;