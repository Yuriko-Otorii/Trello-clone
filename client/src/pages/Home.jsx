import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { setAuth } from '../redux/slicers/authSlice';
import { setProjectIdAction } from '../redux/slicers/projectidSlice'

const Home = () => {
  const [dueTodayTasks, setDueTodayTasks] = useState([])
  const [highPriorityTasks, setHighPriorityTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies();

  const fetchAllTasks = async () => {
    try {
      const response = await fetch(
        'https://task-manager-kymn.onrender.com/getalltasks',
        {
          method: 'POST',
          body: JSON.stringify({ userId: user.userId }),
          headers: { 'Content-Type': 'application/json' },
        },
      )
      if (!response.ok) {
        console.log('Something went wrong...')
      } else {
        const result = await response.json()
        setDueTodayTasks(result.allTasks.dueToday)
        setHighPriorityTasks(result.allTasks.highPriority)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchAllTasks()
  }, [])

  const handleLinkDashboard = (projectId) => {
    dispatch(setProjectIdAction(projectId))    
    navigate('/dashboard')
  }

  const handleLogout = () => {
    dispatch(setAuth(""))
    removeCookie("token");
    navigate('/login')
  }

  return (
    <div className="flex flex-col items-center relative h-full min-h-screen w-fit min-w-full md:h-fit p-4">
      <div className="overlay absolute inset-0 -z-50 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 opacity-40"></div>
      {isLoading
        ? <div className='flex justify-center items-center w-full mt-40'>
            <div role="status">
                <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
          </div> 
        : <div className='flex flex-col justify-center w-4/5'>
            <div className='flex items-center justify-between md:justify-center md:items-end md:mt-10'>
              <h1 className='text-gary-300 text-3xl md:text-5xl'>Hello {user.username}</h1>
              <button onClick={handleLogout} type="button" className="inline-flex items-center ml-4 py-1 px-2 md:py-1.5 text-gray-600 md:text-xl font-medium rounded-lg border-2 border-gray-300 hover:bg-gray-300 focus:outline-none">
                <p>logout</p>
              </button>
              <button onClick={()=> handleLinkDashboard()} type="button" className="inline-flex items-center justify-center w-1/2 md:w-fit ml-4 mt-5 py-3 px-2 md:py-1.5 text-gray-600 md:text-xl font-medium rounded-lg border-2 border-gray-300 hover:bg-gray-300 focus:outline-none hidden md:block">
                <p>Go dashboard</p>
              </button>
            </div>
            <div className='flex flex-col items-center md:mt-10 md:flex-row md:justify-center md:items-start md:gap-4'>
              <div className='py-3 px-4 mt-5 md:display-inline rounded-lg shadow-lg w-80 md:w-96 h-fit bg-gray-200 md:w-80'>
                <h2 className='font-bold text-xl md:text-2xl ml-1'>Due today</h2>
                {
                  dueTodayTasks && dueTodayTasks.map(eachTask => (
                    <div key={eachTask._id} className='px-4 py-1 rounded-lg shadow-lg h-fit my-3 mx-auto bg-white w-72 md:w-auto'>
                      <div className='flex flex-col'>
                        <div className='flex justify-between items-center my-1 h-7'>
                          <div className='flex'>
                            <h3 className='text-lg md:text-xl font-bold'>{eachTask.taskTitle}</h3>
                          </div>                  
                          {eachTask.priority && (
                              <p className='text-sm py-0.5 px-2 text-red-400 border border-red-400 rounded-lg'>Priority</p>
                          )}
                        </div>
                        <p className='truncate mt-2 md:text-lg'>{eachTask.taskDescription}</p>
                        <button onClick={()=> handleLinkDashboard(eachTask.projectId)} type='button' className='flex w-1/2 items-center justify-center inline-block p-1 py-2 mx-auto mt-8 mb-3 border-2 border-gray-400 text-gray-500 font-medium text-sm md:text-base leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                          Check dashboard
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='py-3 px-4 mt-5 md:display-inline rounded-lg shadow-lg w-80 md:w-96 h-fit bg-gray-200 md:w-80'>
                <h2 className='font-bold text-xl md:text-2xl ml-1'>High priority</h2>
                {
                  highPriorityTasks && highPriorityTasks.map(eachTask => (
                    <div key={eachTask._id} className='px-4 py-1 rounded-lg shadow-lg h-fit my-3 mx-auto bg-white w-72 md:w-auto' >
                      <div className='flex flex-col'>
                        <div className='flex justify-between items-center my-1 h-7'>
                          <div className='flex'>
                            <h3 className='text-lg md:text-xl font-bold'>{eachTask.taskTitle}</h3>
                          </div>                  
                          {eachTask.priority && (
                              <p className='text-sm py-0.5 px-2 text-red-400 border border-red-400 rounded-lg'>Priority</p>
                          )}
                        </div>
                        <p className='truncate mt-2 md:text-lg'>{eachTask.taskDescription}</p>
                        <button onClick={()=> handleLinkDashboard(eachTask.projectId)} type='button' className='flex w-1/2 items-center justify-center inline-block p-1 py-2 mx-auto mt-8 mb-3 border-2 border-gray-400 text-gray-500 font-medium text-sm md:text-base leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                          Check dashboard
                        </button>
                      </div>
                    </div>
                    ))
                }         
              </div>
              <button onClick={()=> handleLinkDashboard()} type="button" className="inline-flex items-center justify-center w-1/2 ml-4 mt-5 py-3 px-2 md:py-1.5 text-gray-600 md:text-xl font-medium rounded-lg border-2 border-gray-300 hover:bg-gray-300 focus:outline-none md:hidden">
                <p>Go dashboard</p>
              </button>
            </div>
          </div>
        }
    </div>
  )
}

export default Home