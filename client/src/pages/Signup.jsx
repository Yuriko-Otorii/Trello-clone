
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState("Message")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()      

    try {
      const response = await fetch('https://task-manager-kymn.onrender.com/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        if (response.status === 404) {
          console.log("Eamil already exists.")
          setAlert(true)
          setTimeout(() => setAlert(false), 5000)
          setErrorMessage("Eamil already exists.")
        } else {
          console.log("Something went wrong!");
          setAlert(true)
          setTimeout(() => setAlert(false), 5000)
          setErrorMessage("Something went wrong!");
        }
      } else {
        const data = await response.json()
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    {alert? (
      <div className="flex p-4 pr-8 my-5 mx-4 w-fit text-sm md:text-base text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
        <div>
          {errorMessage}
        </div>
      </div>
    ) : <div></div>}
    
    <div className="flex justify-center py-10 items-center bg-white">
      <form className="bg-white mt-10" onSubmit={handleSubmit}>
        <h1 className="text-gray-800 font-bold text-2xl md:text-4xl mb-10 text-center">
          Sign up
        </h1>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 md:text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 md:text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
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
            className="pl-2 outline-none border-none"
            type="text"
            name="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl md:text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
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
            className="pl-2 outline-none border-none"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          disabled={!(email && password && username)}
          className="block w-full bg-indigo-600 mt-10 py-2 rounded-2xl text-white font-semibold mb-2 disabled:opacity-25 md:text-xl"
        >
          Sign up
        </button>
        <div className="text-center mt-5 text-sm text-blue-500 hover:text-blue-700 cursor-pointer">
          <p onClick={() => navigate('/login')} className="md:text-lg">
            Already have an account?
          </p>
        </div>
      </form>
    </div>
    </>
  )
}

export default Signup
