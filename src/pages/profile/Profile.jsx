import { useState, useEffect } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState({})
    const params = useParams()
    const navigate = useNavigate()
    const imgUrl = process.env.REACT_APP_IMG_URL
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
        } else {
            alert(result.msg)
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
                                src={user.coverPicture ? imgUrl + user.coverPicture : imgUrl + "nobg.jpg"}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture ? imgUrl + user.profilePicture : imgUrl + "no-profile.webp"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}
                            </span>
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