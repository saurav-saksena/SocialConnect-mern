import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Rightbar({ user }) {


    const imgUrl = process.env.REACT_APP_IMG_URL
    const userimg = process.env.REACT_APP_USER
    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.jpg" alt="" />
                    <span className="birthdayText">
                        <b>James Topley </b> and <b>3 other friends</b> have a birhday today.
                    </span>
                </div>
                <a href="https://ducatindia.com/" rel="noreferrer" target="_blank">

                    <img className="rightbarAd" src="assets/add.webp" alt="" />
                </a>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        const [followersContain, setFollowersContain] = useState(false)
        const [fetchword, setFetchword] = useState("")
        const [followersContaindata, setFollowersContaindata] = useState([])
        const getFollowingsList = async (word) => {
            setFetchword(word)
            if (user.followings.length > 0) {
                setFollowersContain(true)
                let response = await fetch("http://localhost:8000/api/users/followings/" + user._id, {
                    method: "GET"
                })
                response = await response.json()
                if (response.success) {
                    setFollowersContain(true)
                    setFollowersContaindata(response.data)
                }
            }
        }
        const getFollowersList = async (word) => {
            setFetchword(word)
            if (user.followers.length > 0) {
                setFollowersContain(true)
                let response = await fetch("http://localhost:8000/api/users/followers/" + user._id, {
                    method: "GET"
                })
                response = await response.json()
                if (response.success) {
                    setFollowersContain(true)
                    setFollowersContaindata(response.data)
                }

            }
        }
        return (
            <>
                <h4 className="rightbarTitle">{user.username} information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey" onClick={() => getFollowingsList("followings")} id="followings--list--button">Followings :</span>
                        <span className="rightbarInfoValue">{user.followings ? user.followings.length : "..."}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey" onClick={() => getFollowersList("followers")} id="followers--list--button" >Followers :</span>
                        <span className="rightbarInfoValue">{user.followers ? user.followers.length : "..."}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city ? user.city : "_ _ _"}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from ? user.from : "_ _ _"}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship ? user.relationship : "_ _ _"}</span>
                    </div>
                    <div className="rightbar--followers--details" style={{ display: followersContain ? "block" : "none" }}>
                        <p>{fetchword}</p>
                        <div style={{ maxHeight: "200px", overflow: "auto" }}>
                            {followersContaindata.length && followersContaindata.map((item) => {
                                return <div className="followers--details--child" key={item._id}>
                                    <img src={item.profilePicture ? userimg + item.profilePicture : imgUrl + "no-profile.webp"} alt="..." className="followers--details--img" />
                                    <span className="followers--details--name">{item.username}</span>

                                    <Link to={`/profile/${item._id}`} className="followers--details--profile">view profile</Link>

                                </div>
                            })
                            }


                        </div>
                        <button onClick={() => { setFollowersContain(false); setFetchword("") }} className="rightbar--followers--details--hide">cancel</button>
                    </div>
                </div>
                <h4 className="rightbarTitle">friends of {user.username}</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img
                            src={`${imgUrl}user/10.jpg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${imgUrl}user/2.jpg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${imgUrl}user/3.jpg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${imgUrl}user/4.jpg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${imgUrl}user/5.jpg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${imgUrl}user/6.jpg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}