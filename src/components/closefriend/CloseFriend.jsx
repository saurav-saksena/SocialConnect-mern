import React from 'react'
import "./closeFriend.css"
export default function CloseFriend(props) {
    const imgUrl = process.env.REACT_APP_IMG_URL
    return (
        <>
            <li className="sidebarFriend">
                <img className="sidebarFriendImg" src={imgUrl + props.user.profilePicture} alt="" />
                <span className="sidebarFriendName">{props.user.username}</span>
            </li>
        </>
    )
}
