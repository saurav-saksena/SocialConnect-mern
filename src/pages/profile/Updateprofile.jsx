import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Updateprofile() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("socialToken")) {
            console.log("welcome to update profile page !")
        } else {
            navigate("/login")
        }
    })
    return (
        <div>
            <h1>Update profile</h1>
        </div>
    )
}
