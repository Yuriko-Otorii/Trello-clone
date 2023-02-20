import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilterTasks from './FilterTasks'

const ToolBar = ({ setFilterValue, setShowNewProjectModal }) => {

  return (
    <div className='flex items-center w-full'>
        <div className="container mx-auto relative w-40">
            <button onClick={() => setShowNewProjectModal(true)} type="button" className="inline-flex items-center ml-4 py-1 px-2 text-gray-600 font-medium rounded-lg border-2 border-gray-300 hover:bg-gray-300 focus:outline-none">
                <p>New project</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
        <FilterTasks setFilterValue={setFilterValue} />
    </div>
  )
}

export default ToolBar