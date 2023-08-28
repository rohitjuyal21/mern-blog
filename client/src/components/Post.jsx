import React from 'react'

const Post = ({ title, author, date, description, image}) => {
  return (
    <div className='flex gap-5 p-4  shadow-md shadow-black/30 '>
        <div className='flex-[0.7] '>
            <img src={image} alt="" />
        </div>
        <div className='flex-1'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <h4 className='font-semibold text-sm text-gray-500 pt-1 pb-3'>
                <a href="" className='underline mr-2 text-gray-700'>{author}</a>
                {date}
            </h4>
            <p className=''>{description}</p>
        </div>
    </div>
  )
}

export default Post