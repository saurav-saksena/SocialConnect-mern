import { useContext, useState } from "react";
import "./login.css";
import SocialContext from "../../ContextStore/SocialContext";
import { Link } from "react-router-dom";

export default function Login() {
    const [loginData, setLoginData] = useState({ email: "", password: "" })

    const { loginApi } = useContext(SocialContext)
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(loginData)
        loginApi(loginData)

    }
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

                        <input onChange={handleChange} required name="email" value={loginData.email} placeholder="Email" className="loginInput" />
                        <input placeholder="Password" required type="password" name="password" onChange={handleChange} value={loginData.password} className="loginInput" />
                        <button className="loginButton">Log In</button>

                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register">

                            <span className="create--account">Create a new Account</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}