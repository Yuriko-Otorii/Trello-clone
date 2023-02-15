import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'

import dayjs from 'dayjs'

import TaskDetailEditSection from "./TaskDetailEditSection"


const DetailPageModal = ({ setShowDetailModal, taskId, setUpdateState, updateState  }) => {
    const [taskInfo, setTaskInfo] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [comment, setComment] = useState("")
    const [infoState, setInfoState] = useState(false)
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
                // console.log(result.taskDetail.taskComments)
              }
        }
        fetchDetailInfo()

        
    }, [infoState])

    const dueDateFromdb = dayjs(taskInfo.dueDate)
    const formattedDueDate = dueDateFromdb.format("YYYY-MM-DD")
    const updatedDate = dayjs(taskInfo.updatedDate)
    const formattedUpdatedDate = updatedDate.format("YYYY-MM-DD")

    const deleteAlert = async (taskTitle, taskId) => {
      const msg = `Are you sure delete task "${taskTitle}"?`
      const result = confirm(msg)
      if(result){
          try {
              const response = await fetch('http://localhost:8000/dashboard/deletetask', {
                method: 'POST',
                body: JSON.stringify({ taskId }),
                headers: { 'Content-Type': 'application/json' },
              })
              
              if (!response.ok) {
                console.log('Something went wrong...')
              } else {
                setShowDetailModal(false)
                setUpdateState(!updateState)
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
          body: JSON.stringify({ postedUser: user.userId, commentBody: comment, belongedTask: taskDetail._id }),
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            console.log('Something went wrong...')
        } else {
          setIsEdit(false)
          setInfoState(!infoState)
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
            ? (<TaskDetailEditSection taskDetail={taskInfo} setIsEdit={setIsEdit} setInfoState={setInfoState} infoState={infoState} />)
            : (<div>
                  <div className="flex items-start justify-between rounded-t mb-3">
                    <div className="flex flex-col">                      
                      <div className="flex items-baseline mt-3">
                        {taskInfo.priority && (
                          <p className='text-sm text-center w-16 py-0.5 px-2 py-0.5 mr-2 text-red-400 border border-red-400 rounded-lg'>Priority</p>
                        )}
                        <p className="text-xs text-gray-500">Due date: {formattedDueDate}</p>
                      </div>
                      <div className="flex items-center">
                        <h3 className="text-2xl font-semibold mr-2">{taskInfo.taskTitle}</h3>                      
                      </div>
                    </div>

                    <div className="flex items-center">
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowDetailModal(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>                      
                    </div>
                  </div>
                  <div className="mb-5">
                      <p className="text-lg">{taskInfo.taskDescription}</p>
                  </div>    
                  <div className="flex justify-end gap-2">
                    <svg onClick={() => setIsEdit(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <svg onClick={() => deleteAlert(taskInfo.taskTitle, taskInfo._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-red-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                </div>
          )}          
          <div className="mt-5">
              <p className="text-xs text-gray-500">Comment</p>
              {taskInfo.taskComments && 
                taskInfo.taskComments.map(eachComment => {
                    <div className="flex items-start mt-2 bg-gray-100 rounded-lg p-2">  
                      <div className="inline w-fit">
                          <div className="flex items-center">        
                              <div className="flex justify-between">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-0.5 text-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="font-bold mr-2 inline w-fit">Username</p>
                              </div>        
                              {/* {
                                表示コメントのユーザーとログインユーザーのIDが一致したら設定アイコンを表示
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              } */}
                          </div>     
                          Each comment 
                      </div>
                    </div>
                  })
              }
              {/* <div className="flex items-start mt-2 bg-gray-100 rounded-lg p-2">  
                  <div className="inline w-fit">
                      <div className="flex items-center">        
                          <div className="flex justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-0.5 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="font-bold mr-2 inline w-fit">Username</p>
                          </div>     
                      </div>     
                      Each comment 
                  </div>
              </div> */}
              
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