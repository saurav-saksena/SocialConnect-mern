import { useState, useEffect, useContext } from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import TimeAgo from 'react-timeago'
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { Link } from "react-router-dom";
import SocialContext from "../../ContextStore/SocialContext";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [user, setUser] = useState({})
    const { userinfo } = useContext(SocialContext)
    const [isLiked, setIsLiked] = useState(post.likes.includes(userinfo._id) ? true : false)
    const imgUrl = process.env.REACT_APP_IMG_URL
    const posturl = process.env.REACT_APP_POST
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

    const likeHandler = async () => {
        try {
            let response = await fetch(`http://localhost:8000/api/posts/${post._id}/dislike`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: userinfo._id })
            })
            response = await response.json()
            if (response.success) {
                setLike(isLiked ? like - 1 : like + 1)
                setIsLiked(!isLiked)
            }

        } catch (error) {

        }

    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>
                            <img
                                className="postProfileImg"
                                src={user.profilePicture ? imgUrl + user.profilePicture : imgUrl + "no-profile.webp"}
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
                    <span className="postText">{post.desc}</span>
                    {post.img !== "" &&
                        <img className="postImg" src={posturl + post.img} alt="..." />
                    }
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/* <img className="likeIcon" src="assets/like.jpg" onClick={likeHandler} alt="" /> */}
                        <img className="likeIcon" src={isLiked ? (`https://img.freepik.com/free-vector/glitter-heart_1048-4609.jpg`) : (`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5FMQFXAJfrKEp95-Qv4QHxM3ZBUWWF83LfVUO2tzN_bJYmRNL1NlE_q4Aaq7TPoy7hQ&usqp=CAU`)} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter"> {like} {like > 1 ? "likes" : "like"}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

