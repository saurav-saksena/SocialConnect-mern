import { useContext } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import SocialContext from "../../ContextStore/SocialContext";
import { Link } from "react-router-dom";

export default function Share() {
    const { userinfo } = useContext(SocialContext)
    const imgUrl = process.env.REACT_APP_IMG_URL

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link to={`/profile/${userinfo._id}`}>
                        <img className="shareProfileImg" src={userinfo.profilePicture ? imgUrl + userinfo.profilePicture : imgUrl + "no-profile.webp"} alt="" />
                    </Link>
                    <input
                        placeholder={`What's in your mind ${userinfo.username} ?`}
                        className="shareInput"
                    />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    );
}
