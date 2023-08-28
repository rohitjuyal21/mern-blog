import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Create = () => {
    const [title, setTitle] = useState('')
  return (
    <form action="" className='flex flex-col gap-3 px-4 py-8'>
       <input type="text" placeholder='Title' className='px-4 py-1 border' /> 
       <input type="text" placeholder='Description' className='px-4 py-1 border' />
       <input type="file" className='cursor-pointer' /> 
       <ReactQuill className='' />
       <button className='bg-gray-800 text-white px-16 py-2 rounded-md mt-2 text-center hover:scale-95 hover:shadow-xl transition-all duration-300 active:bg-gray-900'>Create Post</button>
    </form>
  )
}

export default Create