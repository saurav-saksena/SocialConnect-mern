import React from 'react'
import "./feed.css"
import { Posts } from "../../dummyData"
import Share from '../share/Share'
import Post from '../post/Post'

export default function Feed() {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {Posts.map((data) => (
                    <Post key={data.id} post={data} />
                ))}
            </div>
        </div>
    )
}
