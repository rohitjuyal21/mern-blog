import React, { useEffect, useState } from 'react'
import Post from './Post'

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post')
        .then(response => {
            response.json().then(posts => {
                console.log(posts);
                setPosts(posts);
            })
        })
    }, [])
    return (
        <div className='px-10 py-10 flex flex-col gap-8'>
            {
                posts?.map((post, index) => (
                    <Post
                    title={post.title}
                    author={post.author}
                    createdAt={post.createdAt}
                    description={post.description}
                    image={post.cover}
                    key={index}
                    id={post._id}
                    />
                ))
            }
        </div>
    )
}

export default Posts