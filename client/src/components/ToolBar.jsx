import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FilterTasks from './FilterTasks'
import { setProjectIdAction } from '../redux/slicers/projectidSlice'
import { setDashboardState } from "../redux/slicers/dashboardSlice"


const ToolBar = ({ setFilterValue, setShowNewProjectModal }) => {
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
    <div className='flex items-center w-auto gap-4'>
      <FilterTasks setFilterValue={setFilterValue} />
      <div className="flex gap-4 mx-auto relative w-full">
          <button onClick={() => setShowNewProjectModal(true)} type="button" className="inline-flex items-center ml-4 md:ml-0 py-1 px-2 text-gray-600 font-medium rounded-lg border-2 border-gray-300 hover:bg-gray-300 focus:outline-none">
              <p>New project</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
          </button>
          <button onClick={handleDeleteProject} type="button" className="inline-flex items-center ml-4 md:ml-0 py-1 px-2 text-gray-600 font-medium rounded-lg border-2 border-gray-300 hover:bg-gray-300 focus:outline-none">
              <p>Delete project</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg> 
          </button>
      </div>
    </div>
  )
}

export default ToolBar