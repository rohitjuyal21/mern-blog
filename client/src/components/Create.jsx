import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const createNewPost = async (e) => {
        const data = new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('content', content);
        data.set('file', files[0]);

        e.preventDefault();
        const respone = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (respone.ok) {
            setRedirect(true);
        }
    }

    if (redirect) return <Navigate to={"/"} />

    return (
        <form onSubmit={createNewPost} className='flex flex-col gap-3 px-4 py-8'>
            <input
                type="text"
                placeholder='Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
                className='px-4 py-1 border' />
            <input
                type="text"
                placeholder='Description'
                value={description}
                onChange={e => setDescription(e.target.value)} className='px-4 py-1 border' />
            <input
                type="file"
                onChange={e => setFiles(e.target.files)}
                className='cursor-pointer' />
            <ReactQuill
                modules={modules}
                formats={formats}
                value={content}
                onChange={newValue => setContent(newValue)} />
            <button className='bg-gray-800 text-white px-16 py-2 rounded-md mt-2 text-center active:scale-[0.99] hover:shadow-xl transition-all duration-300 active:bg-gray-900'>Create Post</button>
        </form>
    )
}

export default Create