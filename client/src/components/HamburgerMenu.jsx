import { useState } from "react"
import { useSelector, useDispatch } from "react-redux" 
import { useNavigate } from "react-router-dom"

import { setProjectIdAction } from '../redux/slicers/projectidSlice'
import { setDashboardState } from "../redux/slicers/dashboardSlice"
  
const HamburgerMenu = ({ setShowNewProjectModal, setMobileMenuState, project }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const projectId = useSelector((state) => state.projectId.projectId)
  const dispatch = useDispatch()

  const handleDeleteProject = async () => {
    const msg = `Are you sure delete this project?`
        const result = confirm(msg)
        if(result){
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_PORT}/dashboard/deleteproject`, {
                  method: 'POST',
                  body: JSON.stringify({ projectId }),
                  headers: { 'Content-Type': 'application/json' },
                })
                
                if (!response.ok) {
                  console.log('Something went wrong...')
                } else {
                  dispatch(setProjectIdAction(projectId))    
                  dispatch(setDashboardState())    
                }
              } catch (error) {
                console.log(error);
              }
        }
  }

  return (
    <nav className="border-gray-200 rounded dark:bg-gray-900 relative">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none">
          {isOpen? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            : <svg className="w-6 h-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd">
              </path></svg>
          }
        </button>
        {isOpen && 
          <div className="absolute top-11 right-0 md:top-0 md:left-14 w-40 md:w-52 z-50 rounded-lg">
            <ul className="flex flex-col w-full p-2 rounded-lg bg-gray-100">
              {project 
                ? <>
                    <li>
                      <p onClick={() => navigate('/')} className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">Home</p>
                    </li>
                    <li>
                      <p onClick={() => {setMobileMenuState({selectProjects: true}); setIsOpen(false)}} className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">Select projects</p>
                    </li>
                    <li>
                      <p onClick={() => {setMobileMenuState({filterTasks: true}); setIsOpen(false)}} className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">Filter tasks</p>
                    </li>
                    <li>
                      <p onClick={() => {setShowNewProjectModal(true); setIsOpen(false)}} className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">New project</p>
                    </li>
                    <li>
                      <p onClick={handleDeleteProject} className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">Delete project</p>
                    </li>
                  </>
                : <>
                    <li>
                      <p onClick={() => navigate('/')} className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">Home</p>
                    </li>
                    <li>
                      <p onClick={() => {setShowNewProjectModal(true); setIsOpen(false)}} className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">New project</p>
                    </li>
                  </>
              }
              
            </ul>
          </div>        
        }
      </div>
    </nav>

  )
}

export default HamburgerMenu