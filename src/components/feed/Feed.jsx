import React, { useEffect, useState } from 'react'
import "./feed.css"

import Share from '../share/Share'
import Post from '../post/Post'


export default function Feed({ userId }) {
    const [posts, setPosts] = useState([])
    const getTimelinePost = async () => {
        let response = await fetch(userId ? "/posts/singleuserpost/" + userId : "/posts/timeline/65686033a016b1e7b142724b", {
            "method": "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        let result = await response.json()
        setPosts(result)
    }
    useEffect(() => {
        getTimelinePost()
        // eslint-disable-next-line
    }, [userId])

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((data) => (
                    <Post key={data._id} post={data} />
                ))}
            </div>
        </div>
    )
}
