import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setDashboardState } from '../redux/slicers/dashboardSlice'

const FilterTasks = ({ setFilterValue, setMobileMenuState }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    const handlefilter = (selectedValue) => {
        setIsOpen(false)
        setFilterValue(selectedValue)
        dispatch(setDashboardState())
    }

  return (
    <div className="container mx-auto relative md:w-36">
        <div className='flex items-center'>           
          <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center p-1 px-2 text-gray-600 font-medium rounded-lg border-2 border-gray-300 hover:bg-gray-300 focus:outline-none">
            <p>Filter tasks</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <svg onClick={() => setMobileMenuState("")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1 md:hidden text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        {isOpen && 
          <div className="w-fit absolute top-11 left-0 z-50 rounded-lg">
            <ul className="flex flex-col w-full p-1 rounded-lg bg-gray-100">
                <li className="p-1 px-3 my-1 text-gray-500 rounded-lg rounded hover:bg-gray-700 md:hover:bg-gray-300"
                    onClick={() => handlefilter("all")}
                >
                    All
                </li>
                <li className="p-1 px-3 my-1 text-gray-500 rounded-lg rounded hover:bg-gray-700 md:hover:bg-gray-300"
                    onClick={() => handlefilter("priority")}
                >
                    Priority
                </li>
                <li className="p-1 px-3 my-1 text-gray-500 rounded-lg rounded hover:bg-gray-700 md:hover:bg-gray-300"
                    onClick={() => handlefilter("dueToday")}
                >
                    Due today
                </li>
                <li className="p-1 px-3 my-1 text-gray-500 rounded-lg rounded hover:bg-gray-700 md:hover:bg-gray-300"
                    onClick={() => handlefilter("dueThisWeek")}
                >
                    Due this week
                </li>
            </ul>
          </div>        
        }
        
    </div>
  )
}

export default FilterTasks