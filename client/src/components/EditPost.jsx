import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();

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

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setDescription(postInfo.description);
            })
        })
    }, [])

    const updatePost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('content', content);
        data.set('id', id);
        if(files?.[0]) {
            data.set('file', files[0]);
        }

        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            credentials: 'include', 
            body: data,
        });
        if(response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) return <Navigate to={`/post/${id}`} />

    return (
        <form onSubmit={updatePost} className='flex flex-col gap-3 px-4 py-8'>
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
            <button className='bg-gray-800 text-white px-16 py-2 rounded-md mt-2 text-center active:scale-[0.99] hover:shadow-xl transition-all duration-300 active:bg-gray-900'>Update Post</button>
        </form>
    )
}

export default EditPost