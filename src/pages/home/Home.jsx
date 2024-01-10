import React, { useContext, useEffect } from 'react'
import "./home.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import SocialContext from '../../ContextStore/SocialContext'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const { verifiedUserDetails } = useContext(SocialContext)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("socialToken");
        if (token) {
            verifiedUserDetails(token);
        } else {
            navigate("/login")
        }
        // eslint-disable-next-line 
    }, [])
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}
