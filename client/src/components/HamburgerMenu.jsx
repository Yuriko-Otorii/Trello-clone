import { useState } from "react"
  
const HamburgerMenu = ({ setShowNewProjectModal, setMobileMenuState, project }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-gray-200 rounded dark:bg-gray-900 relative">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <button onClick={() => setIsOpen(true)} type="button" className="inline-flex items-center ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none">
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
                      <a href="#" className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">Home</a>
                    </li>
                    <li>
                      <p onClick={() => {setShowNewProjectModal(true); setIsOpen(false)}} className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">New project</p>
                    </li>
                    <li>
                      <p onClick={() => {setMobileMenuState({selectProjects: true}); setIsOpen(false)}} className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">Select projects</p>
                    </li>
                    <li>
                      <p onClick={() => {setMobileMenuState({filterTasks: true}); setIsOpen(false)}} className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">Filter tasks</p>
                    </li>
                  </>
                : <>
                    <li>
                      <a href="#" className="block py-2 p-4 md:px-10 md:py-3 text-gray-700 underline rounded hover:bg-gray-700 md:hover:bg-gray-300">Home</a>
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