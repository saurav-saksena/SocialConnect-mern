import { useState, useEffect } from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import TimeAgo from 'react-timeago'
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { Link } from "react-router-dom";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const imgUrl = process.env.REACT_APP_IMG_URL
    const formatter = buildFormatter(englishStrings)
    const getUserDetails = async () => {
        let response = await fetch("/users/" + post.userId, {
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
        getUserDetails()
        // eslint-disable-next-line
    }, [])

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>
                            <img
                                className="postProfileImg"
                                src={user.profilePicture || imgUrl + "no-profile.webp"}
                                alt=""
                            />
                        </Link>
                        <Link className="postUsername" to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>

                            <span className="postUsername">
                                {user.username}
                            </span>
                        </Link>
                        <span className="postDate">
                            <TimeAgo date={post.createdAt} formatter={formatter} />
                        </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    {post.img !== "" &&
                        <img className="postImg" src={imgUrl + "post/" + post.img} alt="..." />
                    }
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/* <img className="likeIcon" src="assets/like.jpg" onClick={likeHandler} alt="" /> */}
                        <img className="likeIcon" src={imgUrl + "heart.jpg"} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter"> {isLiked && "Including You "}{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}