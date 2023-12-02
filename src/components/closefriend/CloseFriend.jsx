import React from 'react'
import "./closeFriend.css"
export default function CloseFriend(props) {
    return (
        <>
            <li className="sidebarFriend">
                <img className="sidebarFriendImg" src={props.user.profilePicture} alt="" />
                <span className="sidebarFriendName">{props.user.username}</span>
            </li>
        </>
    )
}
