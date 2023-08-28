import React from 'react'
import Post from './Post'

const Posts = () => {
    return (
        <div className='px-10 py-10 flex flex-col gap-8'>
            <Post
                title="What's a Blog & Why You Need One"
                author="Rohit Juyal"
                date="19-08-2023 1:24 am"
                description="Even if you're not sure what a blog is, you've no doubt come across one at some point in time. Perhaps you've stumbled across a blog when you've searched “healthy dinner recipes”. In fact, if you're reading this, guess what? You're on a blog."
                image="https://blog.hubspot.com/hs-fs/hubfs/what-is-a-blog-3.webp?width=893&height=600&name=what-is-a-blog-3.webp" />
            <Post
                title="What's a Blog & Why You Need One"
                author="Rohit Juyal"
                date="19-08-2023 1:24 am"
                description="Even if you're not sure what a blog is, you've no doubt come across one at some point in time. Perhaps you've stumbled across a blog when you've searched “healthy dinner recipes”. In fact, if you're reading this, guess what? You're on a blog."
                image="https://blog.hubspot.com/hs-fs/hubfs/what-is-a-blog-3.webp?width=893&height=600&name=what-is-a-blog-3.webp" />
            <Post
                title="What's a Blog & Why You Need One"
                author="Rohit Juyal"
                date="19-08-2023 1:24 am"
                description="Even if you're not sure what a blog is, you've no doubt come across one at some point in time. Perhaps you've stumbled across a blog when you've searched “healthy dinner recipes”. In fact, if you're reading this, guess what? You're on a blog."
                image="https://blog.hubspot.com/hs-fs/hubfs/what-is-a-blog-3.webp?width=893&height=600&name=what-is-a-blog-3.webp" />
        </div>
    )
}

export default Posts