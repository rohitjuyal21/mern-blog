import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      })
    } else {
      toast.error("Wrong credentials")
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <div className='flex flex-col items-center max-w-[400px] m-auto mt-6'>
      <h1 className='text-2xl font-bold mb-6'>Log in</h1>
      <form action="" onSubmit={login} className='flex flex-col items-center gap-3 w-full'>
        <input
          type="text"
          name="username"
          placeholder='Username'
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
          className='w-full  py-2 px-4 bg-gray-100 outline-none rounded-md  focus:border-b border-gray-500' />
        <input
          type="password"
          name="password"
          placeholder='Password'
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='w-full py-2 px-4 bg-gray-100 outline-none rounded-md  focus:border-b border-gray-500' />
        <button className='bg-gray-800 text-white px-16 py-2 rounded-md mt-2 text-center hover:-translate-y-1 transition-all duration-300 active:bg-gray-900'>Log in</button>
      </form>
      <p className='mt-5'>Don't you have an account?
        <Link to="/register" className='font-bold hover:underline'> Register</Link>
      </p>
    </div>
  )
}

export default Login