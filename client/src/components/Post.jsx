import React from 'react'
import { Link } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'

const Post = ({ id, title, author, createdAt, description, image }) => {
  return (
    <div className='flex sm:flex-row flex-col gap-5 p-4  shadow-md shadow-black/30 '>
      <div className='sm:flex-[0.7] '>
        <Link to={`/post/${id}`}>
          <img src={'http://localhost:4000/' + image} alt="" />
        </Link>
      </div>
      <div className='sm:flex-1'>
        <Link to={`/post/${id}`}>
          <h1 className='text-2xl font-bold hover:underline'>{title}</h1>
        </Link>
        <h4 className='font-semibold text-sm text-gray-500 pt-1 pb-3'>
          <a href="" className='underline mr-2 text-gray-700'>{author?.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </h4>
        <p className=''>{description}</p>
      </div>
    </div>
  )
}

export default Post