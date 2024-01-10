import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useContext, useEffect, useRef, useState } from "react";
import SocialContext from "../../ContextStore/SocialContext";

export default function Register() {
    const [registerData, setRegisterData] = useState({ username: "", email: "", password: "", confirmpassword: "" })
    const navigatge = useNavigate()
    const ref = useRef()
    const { errorAlert } = useContext(SocialContext)
    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }
    const registerUser = async (item) => {
        const response = await fetch("http://localhost:8000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
        let result = await response.json()
        if (result.success) {
            navigatge("/login")

        } else {
            errorAlert(result.msg)
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (registerData.password === registerData.confirmpassword) {

            registerUser(registerData)
        } else {
            errorAlert("password do not match !")
        }
    }
    useEffect(() => {
        ref.current.focus()
    })
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialConnect</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on SocialConnect.
                    </span>
                </div>
                <div className="loginRight">
                    <form onSubmit={handleSubmit} className="loginBox">
                        <input ref={ref} required name="username" onChange={handleChange} placeholder="Username" className="loginInput" />
                        <input required type="email" name="email" onChange={handleChange} placeholder="Email" className="loginInput" />
                        <input type="password" required name="password" onChange={handleChange} placeholder="Password" className="loginInput" />
                        <input type="password" required name="confirmpassword" onChange={handleChange} placeholder="Password Again" className="loginInput" />
                        <button className="loginButton">Sign Up</button>
                        <Link to="/login">
                            <span className="loginRegisterButton">
                                Log into Account
                            </span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}