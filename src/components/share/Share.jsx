import { useContext, useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import SocialContext from "../../ContextStore/SocialContext";
import { Link } from "react-router-dom";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
export default function Share() {
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState(null)
    const { userinfo, errorAlert } = useContext(SocialContext)
    const imgUrl = process.env.REACT_APP_IMG_URL
    const userimg = process.env.REACT_APP_USER
    const postData = async () => {
        let item = new FormData()
        item.append("userId", userinfo._id)
        item.append("desc", desc)
        item.append("img", img)
        let response = await fetch("http://localhost:8000/api/posts", {
            method: "POST",
            body: item
        })
        response = await response.json()
        if (response.success) {
            window.location.reload();
        } else {
            errorAlert(response.msg)
        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link to={`/profile/${userinfo._id}`}>
                        <img className="shareProfileImg" src={userinfo.profilePicture ? userimg + userinfo.profilePicture : imgUrl + "no-profile.webp"} alt="" />
                    </Link>
                    <input
                        placeholder={`What's in your mind ${userinfo.username} ?`}
                        className="shareInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />

                </div>
                <hr className="shareHr" />
                {img && <div className="selected--img--container"><img src={URL.createObjectURL(img)} alt="..." className="selected--img" />
                    <span className="cancel--img" onClick={() => setImg(null)}><CancelPresentationIcon /></span>
                </div>}
                <div className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor="selectimgtoshare" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{ display: "none" }} id="selectimgtoshare" type="file" onChange={(e) => setImg(e.target.files[0])} />
                        </label>
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
                    <button className="shareButton" onClick={postData}>Share</button>
                </div>
            </div>
        </div>
    );
}
