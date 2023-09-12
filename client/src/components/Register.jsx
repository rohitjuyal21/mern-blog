import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.status !== 200) {
      toast.error("Registration Failed!");
    } else {
      toast.success("Registration Successfull!");
      setUsername("");
      setPassword("");
    }
  }

  return (
    <div className='flex flex-col items-center max-w-[400px] m-auto mt-6'>
      <h1 className='text-2xl font-bold mb-6'>Register</h1>
      <form onSubmit={register} className='flex flex-col items-center gap-3 w-full'>
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
        <button className='bg-gray-800 text-white px-16 py-2 rounded-md mt-2 text-center hover:-translate-y-1 transition-all duration-300 active:bg-gray-900'>Register</button>
      </form>
      <p className='mt-5'>Already have an account?
        <Link to="/login" className='font-bold hover:underline'> Log in</Link>
      </p>
    </div>
  )
}

export default Register