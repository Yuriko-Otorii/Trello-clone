import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setDashboardState } from '../redux/slicers/dashboardSlice'

const ProjectsDropdown = ({ projects, setProjectId }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const dispatch = useDispatch()

  const handleSwitchProject = (projectId) => {
    setIsOpen(false)
    setProjectId(projectId)
    dispatch(setDashboardState())
  }

  return (
    <div className="container flex items-center mx-auto relative w-full">
        <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center ml-3 p-1 px-2 text-gray-600 font-medium rounded-lg border-2 border-gray-300 hover:bg-gray-300 focus:outline-none">
          <p>Select projects</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button> 
        {isOpen && 
          <div className="w-fit absolute top-11 left-3 md:top-11 md:left-3 z-50 rounded-lg">
            <ul className="flex flex-col w-full p-1 rounded-lg bg-gray-100">
            {projects.length > 0 && 
                projects.map(eachProject => (
                    <li
                        key={eachProject._id}
                        className="p-1 px-3 my-1 text-gray-500 rounded-lg rounded hover:bg-gray-700 md:hover:bg-gray-300"
                        onClick={() => handleSwitchProject(eachProject._id)}
                    >
                        {eachProject.projectTitle}
                    </li>
                ))
            }
            </ul>
          </div>        
        }
      </div>
  )
}

export default ProjectsDropdown




