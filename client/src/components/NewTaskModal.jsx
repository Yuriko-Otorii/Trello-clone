import { useState } from "react"
import { useSelector } from 'react-redux'
import Datepicker from "react-tailwindcss-datepicker";


const NewTaskModal = ({ setShowNewTaskModal }) => {
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [dueDate, setDueDate] = useState(new Date());
    const [isChecked, setIsChecked] = useState(false)
    const user = useSelector((state) => state.auth.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({taskTitle});
        console.log({taskDescription});
        console.log({dueDate});
        console.log({isChecked});
        console.log({user});
        setShowNewTaskModal(false)
    }


  return (
    <div className="flex justify-center items-center h-screen fixed inset-0 z-50 outline-none focus:outline-none">
    <div
            className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"
        ></div>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-fit w-4/5 md:w-1/2 bg-white outline-none focus:outline-none overflow-y-scroll">
        <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-2xl font-semibold">New task</h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => setShowNewTaskModal(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form action='' method='POST' onSubmit={handleSubmit}>
            <div className="px-6 py-4 flex-auto">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Task title
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="taskTitle"
                    placeholder="Task title"
                    onChange={(e) => setTaskTitle(e.target.value)}
                    value={taskTitle}
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Task description
                </label>
                <textarea 
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="taskDescription"
                    placeholder="Task description"
                    onChange={(e) => setTaskDescription(e.target.value)}
                    value={taskDescription}
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Due date
                </label>
                <Datepicker 
                    value={dueDate}
                    onChange={(e) => setDueDate(e)}
                    useRange={false}
                    asSingle={true} 
                    inputClassName="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
                <label className="block text-gray-700 text-sm font-bold ml-2 mt-5 flex items-end">
                    <input type="checkbox" value={isChecked} onChange={() => setIsChecked? setIsChecked(false): setIsChecked(true)} className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    High priority
                </label>
            </div>
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
            <button
                className="bg-emerald-400 text-white active:bg-emerald-600 uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
            >
                Save
            </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default NewTaskModal