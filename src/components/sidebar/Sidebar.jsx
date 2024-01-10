import React from 'react'
import "./sidebar.css"
import { Users } from "../../dummyData"
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, WorkOutline } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseFriend from '../closefriend/CloseFriend';
import { useNavigate } from 'react-router-dom';
export default function Sidebar() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("socialToken")

        navigate("/login")
    }
    return (
        <>
            <div className='sidebar'>
                <div className="sidebarWrapper">
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'>
                            <RssFeedIcon className='sidebarIcon' />
                            <span className='sidebarListItemText'>Feed</span>
                        </li>
                        <li className='sidebarListItem'>
                            <Chat className='sidebarIcon' />
                            <span className='sidebarListItemText'>Chat</span>
                        </li>
                        <li className='sidebarListItem'>
                            <PlayCircleFilledOutlined className='sidebarIcon' />
                            <span className='sidebarListItemText'>Videos</span>
                        </li>
                        <li className='sidebarListItem'>
                            <Group className='sidebarIcon' />
                            <span className='sidebarListItemText'>Groups</span>
                        </li>
                        <li className='sidebarListItem'>
                            <Bookmark className='sidebarIcon' />
                            <span className='sidebarListItemText'>Bookmarks</span>
                        </li>
                        <li className='sidebarListItem'>
                            <HelpOutline className='sidebarIcon' />
                            <span className='sidebarListItemText'>Questions</span>
                        </li>
                        <li className='sidebarListItem'>
                            <WorkOutline className='sidebarIcon' />
                            <span className='sidebarListItemText'>Jobs</span>
                        </li>
                        <li className='sidebarListItem'>
                            <Event className='sidebarIcon' />
                            <span className='sidebarListItemText'>Events</span>
                        </li>
                        <li className='sidebarListItem' onClick={() => logout()} title='logout from this account'>
                            <LogoutIcon className='sidebarIcon' />
                            <span className='sidebarListItemText'>Logout</span>
                        </li>
                    </ul>
                    <button className="sidebarButton">Show More</button>
                    <hr className="sidebarHr" />
                    <ul className='sidebarFriendList' >
                        {Users.map(user => {
                            return <CloseFriend key={user.id} user={user} />
                        })}
                    </ul>

                </div>
            </div>
        </>
    )
}
