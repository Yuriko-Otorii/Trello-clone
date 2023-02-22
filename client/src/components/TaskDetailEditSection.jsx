import { useState } from 'react'
import { useDispatch } from 'react-redux'

import DatePicker from './DatePicker'
import { setDashboardState } from "../redux/slicers/dashboardSlice"


const TaskDetailEditSection = ({
  taskDetail,
  setIsEdit,
  setInfoState,
  infoState
}) => {
  const [taskTitle, setTaskTitle] = useState(taskDetail.taskTitle)
  const [taskDescription, setTaskDescription] = useState(taskDetail.taskDescription)
  const [dueDate, setDueDate] = useState(new Date(taskDetail.dueDate))
  const [isChecked, setIsChecked] = useState(taskDetail.priority)
  const dispatch = useDispatch()


  const handleTaskDetailSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:8000/dashboard/updatetask',
        {
          method: 'POST',
          body: JSON.stringify({
            taskTitle,
            taskDescription,
            dueDate,
            isChecked,
            taskId: taskDetail._id,
          }),
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (!response.ok) {
        console.log('Something went wrong...')
      } else {
        setIsEdit(false)
        setInfoState(!infoState)
        dispatch(setDashboardState())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleTaskDetailSubmit}
      className="border-2 border-blue-300 rounded-lg p-3 mb-3"
    >
      <div className="flex items-start justify-between w-full rounded-t mb-3">
        <div className="w-full">
          <div className="flex flex-col md:text-lg">
            <label className="block text-gray-700 text-sm md:text-base md:text-base font-bold mb-2">
              Task title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="taskTitle"
              onChange={(e) => setTaskTitle(e.target.value)}
              value={taskTitle}
            />
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2">
              Task description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              rows="4"
              name="taskDescription"
              placeholder="Task description"
              onChange={(e) => setTaskDescription(e.target.value)}
              value={taskDescription}
            />
            <div className="mt-2">
              <label className="block text-gray-700 text-sm md:text-base font-bold mb-2">
                Due date
              </label>
              <DatePicker dueDate={dueDate} setDueDate={setDueDate} />
            </div>
            {isChecked ? (
              <label className="block text-gray-700 text-sm md:text-lg font-bold ml-1 flex items-end md:items-center">
                <input
                  checked={isChecked}
                  type="checkbox"
                  onChange={() => setIsChecked(!isChecked)}
                  className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                High priority
              </label>
            ) : (
              <label className="block text-gray-700 text-sm font-bold ml-1 flex items-end">
                <input
                  checked={isChecked}
                  type="checkbox"
                  onChange={() => setIsChecked(!isChecked)}
                  className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                High priority
              </label>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button
          type="submit"
          disabled={!(taskTitle && taskDescription)}
          className="bg-blue-400 text-white md:text-base active:bg-blue-600 uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg hover:bg-blue-600 outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setIsEdit(false)}
          className="text-red-500 hover:text-white md:text-base border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none hover:shadow-lg focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Cansel
        </button>
      </div>
    </form>
  )
}

export default TaskDetailEditSection
