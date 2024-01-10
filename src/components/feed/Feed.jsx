import React, { useEffect, useState } from 'react'
import "./feed.css"

import Share from '../share/Share'
import Post from '../post/Post'
import { Skeleton } from '@mui/material'

export default function Feed({ userId }) {
    const [posts, setPosts] = useState([])
    const getTimelinePost = async () => {
        let response = await fetch(userId ? "/posts/singleuserpost/" + userId : "/posts/allusers/allposts", {
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
                {posts.length === 0 ? (<div><Skeleton variant="text" width={200} height={50} />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <br />
                    <h2>No Post available !</h2>
                    <Skeleton variant="rounded" width={210} height={60} /></div>) : posts.map((data) => (
                        <Post key={data._id} post={data} />
                    ))}
            </div>
        </div>
    )
}
