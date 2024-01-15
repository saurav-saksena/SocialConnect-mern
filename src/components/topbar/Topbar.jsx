import React, { useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import "./topbar.css"
import { Link } from 'react-router-dom';
import SocialContext from '../../ContextStore/SocialContext';


export default function Topbar() {
    const { userinfo } = useContext(SocialContext)
    const imgUrl = process.env.REACT_APP_IMG_URL
    const userimg = process.env.REACT_APP_USER
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>

                    <span className='logo-title'>SocialConnect</span>
                </Link>
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
                <Link to={`/profile/${userinfo._id}`}>

                    <img src={userinfo.profilePicture ? userimg + userinfo.profilePicture : imgUrl + "no-profile.webp"} alt='profile' title='profile' className='topbarImg' />
                </Link>
            </div>
        </div>
    )
}
