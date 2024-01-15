import { useState, useEffect, useContext } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import SocialContext from "../../ContextStore/SocialContext";

export default function Profile() {
    const [user, setUser] = useState({})
    const { userinfo } = useContext(SocialContext)
    const [follow, setFollow] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    const imgUrl = process.env.REACT_APP_IMG_URL
    const userimg = process.env.REACT_APP_USER
    const getUserDetails = async () => {
        let response = await fetch("/users/" + params.userId, {
            "method": "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        let result = await response.json()
        if (result.success) {

            setUser(result.user)
            setFollow(result.user.followers)
        } else {
            alert(result.msg)
        }
    }
    // logic for follow or unfollow a user 
    const followUser = async () => {
        let response = await fetch(follow.includes(userinfo._id) ? `http://localhost:8000/api/users/${user._id}/unfollow` : `http://localhost:8000/api/users/${user._id}/follow`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: userinfo._id })
        })
        response = await response.json()
        if (response.success) {

            getUserDetails()
        } else {
            console.log(response.msg)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("socialToken")) {

            getUserDetails()
        } else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [params.userId])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user.coverPicture ? userimg + user.coverPicture : imgUrl + "nobg.jpg"}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture ? userimg + user.profilePicture : imgUrl + "no-profile.webp"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}
                            </span>
                            {userinfo._id === user._id && <Link className="updateprofile" to={`/updateprofile/${userinfo._id}`}>update_profile</Link>}
                            {userinfo._id !== user._id && <span onClick={followUser} className="follow--button">{follow.includes(userinfo._id) ? "unfollow" : "follow"}</span>}
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed userId={params.userId} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}