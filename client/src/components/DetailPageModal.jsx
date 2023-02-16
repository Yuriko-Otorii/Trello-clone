import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'

import dayjs from 'dayjs'

import TaskDetailEditSection from "./TaskDetailEditSection"
import { setDashboardState } from "../redux/slicers/dashboardSlice"
import EachComment from "./EachComment"


const DetailPageModal = ({ setShowDetailModal, taskId }) => {
    const [taskInfo, setTaskInfo] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [comment, setComment] = useState("")
    const [infoState, setInfoState] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        const fetchDetailInfo = async () => {
            const response = await fetch(
                'http://localhost:8000/dashboard/gettaskdetail',
                {
                  method: 'POST',
                  body: JSON.stringify({ taskId }),
                  headers: { 'Content-Type': 'application/json' },
                },
              )
              if (!response.ok) {
                console.log('Something went wrong...')
              } else {
                const result = await response.json()
                setTaskInfo(result.taskDetail)
                // console.log(result.taskDetail)
              }
        }
        fetchDetailInfo()
        
    }, [infoState])

    const dueDateFromdb = dayjs(taskInfo.dueDate)
    const formattedDueDate = dueDateFromdb.format("YYYY-MM-DD")
    const updatedDate = dayjs(taskInfo.updatedDate)
    const formattedUpdatedDate = updatedDate.format("YYYY-MM-DD")

    const deleteAlert = async (message, targetId) => {
      const msg = `Are you sure delete "${message}"?`
      const result = confirm(msg)
      if(result){
          try {
              const response = await fetch('http://localhost:8000/dashboard/deletetask', {
                method: 'POST',
                body: JSON.stringify({ targetId }),
                headers: { 'Content-Type': 'application/json' },
              })
              
              if (!response.ok) {
                console.log('Something went wrong...')
              } else {
                setShowDetailModal(false)
                dispatch(setDashboardState())
              }
            } catch (error) {
              console.log(error);
            }
      }
    }

    const handleCommentSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch('http://localhost:8000/dashboard/savecomment', {
          method: 'POST',
          body: JSON.stringify({ postedUser: user.userId, commentBody: comment, belongedTask: taskInfo._id }),
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            console.log('Something went wrong...')
        } else {
          setComment("")
          setIsEdit(false)
          setInfoState(!infoState)
          dispatch(setDashboardState())
        }
      } catch (error) {
        console.log(error);
      }
    }

    


  return (
    <div className="flex justify-center h-screen fixed inset-0 z-50 outline-none focus:outline-none">
    <div
            className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"
        ></div>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full m-2 p-4 md:w-1/2 bg-white outline-none focus:outline-none overflow-y-scroll">
        <div>
          {isEdit
            ? (<TaskDetailEditSection
                taskDetail={taskInfo}
                setIsEdit={setIsEdit}
                setInfoState={setInfoState}
                infoState={infoState}
             />)
            : (<div>
                  <div className="flex flex-col">                      
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-baseline">
                        {taskInfo.priority && (
                          <p className='text-sm text-center w-16 py-0.5 px-2 py-0.5 mr-2 text-red-400 border border-red-400 rounded-lg'>Priority</p>
                        )}
                        <p className="text-xs text-gray-500">Due date: {formattedDueDate}</p>
                      </div>
                      <div className="flex justify-end items-center gap-1">
                        <svg onClick={() => setIsEdit(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <svg onClick={() => deleteAlert(`task ${taskInfo.taskTitle}`, taskInfo._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-red-700">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        <button
                          className="p-1 ml-4 bg-transparent border-0 text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowDetailModal(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <h3 className="text-2xl font-semibold mr-2">{taskInfo.taskTitle}</h3>                      
                    </div>                      
                  </div>
                    
                  <div className="mb-5">
                      <p className="text-lg">{taskInfo.taskDescription}</p>
                  </div>    
                  
                </div>
          )}          
          <div className="mt-5">
              <p className="text-xs text-gray-500">Comment</p>
              {taskInfo.hasOwnProperty('taskComments') && taskInfo.taskComments.length > 0 && 
                taskInfo.taskComments.map(eachComment => (
                  <EachComment eachComment={eachComment} key={eachComment._id} />              
                ))
              }
              
              <form onSubmit={handleCommentSubmit}>
                <textarea 
                  rows="2"
                  className="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your comments here" 
                  name="commentBody"
                  value={comment} 
                  onChange={(e) => setComment(e.target.value)} 
                />

                <button
                  type="submit"
                  disabled={!comment}
                  className="w-1/3 bg-blue-500 mt-1 py-1 rounded-xl text-white font-semibold disabled:opacity-25"
                >
                  Add comment
                </button>
              </form>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <p className="text-xs text-gray-500">Updated date: {formattedUpdatedDate}</p>
        </div>
      </div>
    </div>
  )
}

export default DetailPageModal