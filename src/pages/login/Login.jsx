import { useContext, useEffect, useState } from "react";
import "./login.css";
import SocialContext from "../../ContextStore/SocialContext";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
export default function Login() {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)

    const { errorAlert } = useContext(SocialContext)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginApi(loginData)

    }
    const loginApi = async (item) => {
        setLoading(true)
        let response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        response = await response.json();
        if (response.success) {
            // verifiedUserDetails(response.authToken);
            localStorage.setItem("socialToken", response.authToken);
            setTimeout(() => {

                navigate("/")
            }, 1500)
        } else {
            setTimeout(() => {

                setLoading(false)
                errorAlert(response.msg);
            }, 1000)

        }
    };
    useEffect(() => {
        if (localStorage.getItem("socialToken")) {
            navigate("/")
        }
        // eslint-disable-next-line
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

                        <input onChange={handleChange} type="email" required name="email" value={loginData.email} placeholder="Email" className="loginInput" />
                        <input placeholder="Password" required type="password" name="password" onChange={handleChange} value={loginData.password} className="loginInput" />
                        <button className="loginButton">{loading ? <CircularProgress color="inherit" /> : "Log In"}</button>

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