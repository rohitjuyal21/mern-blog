import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'
import { UserContext } from '../UserContext';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext)
    console.log("userInfo", userInfo)
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    console.log(postInfo)

                    setPostInfo(postInfo)
                })
            })
    }, []);

    if (!postInfo) return ''

    return (
        <div className='py-10 px-5 flex flex-col items-center gap-1'>
            <h1 className='text-3xl font-bold text-center pb-1'>{postInfo.title}</h1>
            <time className='text-xs text-gray-500'>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <h4 className='font-medium'>by {postInfo.author.username}</h4>
                {userInfo.id === postInfo.author._id && (
                    <Link to={`/edit/${postInfo._id}`} className='flex items-center bg-gray-800 text-white px-6 py-2 rounded-md my-1 border hover:bg-white hover:text-gray-800 hover:border-gray-700 active:scale-95 transition duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                        <path d="M16 5l3 3"></path>
                    </svg>
                    Edit this Post
                </Link>
                )}
            <div className='flex max-h-[200px] w-full overflow-hidden py-2'>
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" className='object-cover object-center w-full ' />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className='text-gray-800 leading-7' />
        </div>
    )
}

export default PostPage