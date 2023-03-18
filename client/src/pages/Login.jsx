import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useCookies } from "react-cookie";

import { setAuth } from '../redux/slicers/authSlice';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [cookies, setCookie, removeCookie] = useCookies();
  
  
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`https://task-manager-kymn.onrender.com/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        if (response.status === 400) console.log('Missing credentials')
        else if (response.status === 404)
          console.log('Invalid email and/or password')
        else console.log('Something went wrong...')
      } else {
        const data = await response.json()
        setCookie("token", data.token)
        dispatch(setAuth(data))
        navigate('/')
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center py-10 items-center">
      <div className="overlay absolute inset-0 -z-50 bg-gradient-to-r from-green-300 to-blue-300 opacity-60"></div>
      <form className="mt-10" onSubmit={handleSubmit}>
        <h1 className="text-gray-800 font-bold text-2xl md:text-4xl mb-10 text-center">Login</h1>
        <div className="flex items-center border-2 border-gray-500 py-2 px-3 rounded-2xl mb-4 md:text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none bg-transparent"
            type="text"
            name="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            ref={inputRef}
          />
        </div>
        <div className="flex items-center border-2 border-gray-500 py-2 px-3 rounded-2xl md:text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none bg-transparent"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          disabled={!(email && password)}
          className="block w-full bg-indigo-600 mt-10 py-2 rounded-2xl text-white font-semibold mb-2 disabled:opacity-25 md:text-xl"
        >
          Login
        </button>
        <div className='text-center mt-5 text-sm text-blue-500 hover:text-blue-700 cursor-pointer'>
          <p onClick={() => navigate('/signup')} className="md:text-lg">
            Don't have an account?
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
