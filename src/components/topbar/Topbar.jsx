import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import "./topbar.css"

export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className='logo-title'>SocailConnect</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className='searchIcon' />
                    <input placeholder='Search for friend post of video..' className='searchInput' />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className='topbarLink'>Homepage</span>
                    <span className='topbarLink'>Timeline</span>
                </div>
                <div className='topbarIcons'>
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                </div>
                <img src='https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600' alt='profile' className='topbarImg' />
            </div>
        </div>
    )
}
