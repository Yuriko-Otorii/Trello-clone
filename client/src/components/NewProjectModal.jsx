import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setDashboardState } from '../redux/slicers/dashboardSlice'

const NewProjectModal = ({ setShowNewProjectModal }) => {
    const [projectTitle, setProjectTitle] = useState("")
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch('http://localhost:8000/dashboard/savenewproject', {
              method: 'POST',
              body: JSON.stringify({ projectTitle, createdUser: user.userId }),
              headers: { 'Content-Type': 'application/json' },
            })
    
            if (!response.ok) {
              console.log('Something went wrong...')
            } else {
              setShowNewProjectModal(false)
              dispatch(setDashboardState())
            }
          } catch (error) {
            console.log(error);
          }
    }


  return (
    <div className="flex justify-center items-center h-screen fixed inset-0 z-50 outline-none focus:outline-none">
    <div
            className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"
        ></div>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-4/5 md:w-1/3 bg-white outline-none focus:outline-none">
        <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-2xl font-semibold">New project</h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => setShowNewProjectModal(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 flex-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Project title
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="projectTitle"
                placeholder="Project title"
                onChange={(e) => setProjectTitle(e.target.value)}
                value={projectTitle}
              />
          </div>
          <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
            <button
              type="submit"
              disabled={!(projectTitle)}
              className="bg-emerald-400 text-white active:bg-emerald-600 uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewProjectModal