import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";

export default function Profile() {
    const params = useParams()
    const imgUrl = process.env.REACT_APP_IMG_URL
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
                                src={imgUrl + "cover-art.png"}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={imgUrl + "user/7.jpg"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Safak Kocaoglu</h4>
                            <span className="profileInfoDesc">Hello my friends!
                            </span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed userId={params.userId} />
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    );
}