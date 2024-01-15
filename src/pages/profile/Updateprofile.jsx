import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./profile.css"
import SocialContext from '../../ContextStore/SocialContext'

export default function Updateprofile() {
    const navigate = useNavigate()
    const { userinfo, verifiedUserDetails } = useContext(SocialContext)
    const [userData, setUserData] = useState({ username: "", desc: "", city: "", from: "", relationship: "", profilePicture: "", coverPicture: "" })
    const params = useParams()
    const handleChange = (e) => {
        setUserData(pre => {
            return { ...pre, [e.target.name]: e.target.value }
        })
    }
    const handleFile = (e) => {
        setUserData(pre => {
            return { ...pre, [e.target.name]: e.target.files[0] }
        })
    }
    const updateButton = async () => {
        let item = new FormData()
        item.append("userId", userinfo._id)
        item.append("desc", userData.desc)
        item.append("city", userData.city)
        item.append("from", userData.from)
        item.append("relationship", userData.relationship)
        item.append("coverPicture", userData.coverPicture)
        item.append("profilePicture", userData.profilePicture)
        let respone = await fetch("http://localhost:8000/api/users/" + params.userId, {
            method: "PUT",
            body: item
        })
        respone = await respone.json()
        if (respone.success) {
            verifiedUserDetails()
            navigate("/profile/" + userinfo._id)
        } else {
            alert(respone.msg)
        }
    }
    useEffect(() => {

        if (userinfo.username) {

            setUserData({ username: userinfo.username, desc: userinfo.desc, city: userinfo.city, from: userinfo.from, relationship: userinfo.relationship ? userinfo.relationship : "", profilePicture: "", coverPicture: "" })
        }
    }, [userinfo])
    useEffect(() => {
        if (localStorage.getItem("socialToken")) {
        } else {
            navigate("/login")
        }
    })
    return (
        <div className='update--container'>
            <h1>Update profile</h1>
            <div className='update--item'>
                <span id='notify'>username can not be changed</span>
                <input type='text' disabled name='username' onChange={handleChange} value={userData.username} />
            </div>
            <div className='update--item'>
                <label htmlFor='desc1'> description :</label>
                <input type='text' id='desc1' name='desc' onChange={handleChange} value={userData.desc} />
            </div>
            <div className='update--item'>
                <label htmlFor='city1'> city :  </label>
                <input type='text' id='city1' name='city' onChange={handleChange} value={userData.city} />

            </div>
            <div className='update--item'>
                <label htmlFor='from1'> from :  </label>
                <input type='text' name='from' onChange={handleChange} value={userData.from} />

            </div>
            <div className='update--item'>
                <label>relationship</label>
                <select name='relationship' onChange={handleChange} value={userData.relationship}>
                    <option value="">choose relationship</option>
                    <option value="single">single</option>
                    <option value="married">married</option>
                    <option value="divorced">divorced</option>
                    <option value="don't disclose">other</option>
                </select>
            </div>
            <div className='update--item'>
                <label>profile picture</label>
                <input type='file' onChange={handleFile} name='profilePicture' />
            </div>
            <div className='update--item'>
                <label>cover picture</label>
                <input type='file' onChange={handleFile} name='coverPicture' />
            </div>
            <button onClick={updateButton} className='update--button'>update_profile</button>
        </div>
    )
}
