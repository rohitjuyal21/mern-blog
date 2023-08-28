import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const username = userInfo?.username;

    const logout = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        })
        console.log(res)
        setUserInfo(null);
    }

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include'
        }).then(res => {
            res.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, [])

    return (
        <header className='flex justify-between items-center px-4 py-3'>
            <Link to="/">
                <h1 className='text-3xl font-bold hover:-translate-y-1 transition-all duration-300'>My Blog</h1>
            </Link>
            <nav className='flex gap-10 text-lg'>
                {username ?
                    <>
                        <Link to="/create">Create a new Post</Link>
                        <a href="" onClick={logout}>Log out</a>
                    </> :
                    <>
                        <Link to="/login" className='hover:underline'>Log in </Link>
                        <Link to="/register" className='hover:underline'>Register
                        </Link>
                    </>
                }

            </nav>
        </header>
    )
}

export default Header