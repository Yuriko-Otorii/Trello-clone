import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setDashboardState } from "../redux/slicers/dashboardSlice"


const EachComment = ({ eachComment, taskId, setInfoState, infoState }) => {
    const [editComment, setEditComment] = useState("")
    const [isCommentEdit, setIsCommentEdit] = useState(false)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    const handleCommentEdit = (commentValue) => {
        setIsCommentEdit(true)
        setEditComment(commentValue)
      }
  
      const handleCommentupdate = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_PORT}/dashboard/updatetaskcomment`,
                {
                  method: 'POST',
                  body: JSON.stringify({
                    taskCommentBody: editComment,
                    taskCommentId: eachComment._id
                  }),
                  headers: { 'Content-Type': 'application/json' },
                },
              )
        
              if (!response.ok) {
                console.log('Something went wrong...')
              } else {
                setEditComment("")
                setIsCommentEdit(false)
                setInfoState(!infoState)
                dispatch(setDashboardState())
              }
        } catch (error) {
          console.log(error);
        } 
      } 

      const deleteAlert = async (tasCommentkId, taskId) => {
        const msg = `Are you sure delete this comment"?`
        const result = confirm(msg)
        if(result){
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_PORT}/dashboard/deletetaskcomment`, {
                  method: 'POST',
                  body: JSON.stringify({ tasCommentkId, taskId }),
                  headers: { 'Content-Type': 'application/json' },
                })
                
                if (!response.ok) {
                  console.log('Something went wrong...')
                } else {
                    setIsCommentEdit(false)
                    setInfoState(!infoState)
                    dispatch(setDashboardState())
                }
              } catch (error) {
                console.log(error);
              }
        }
      }

  return (
    <div className="w-full mt-2 bg-gray-100 rounded-lg p-2" key={eachComment._id}>  
        <div className="inline w-fit">
            <div className="flex items-center justify-between w-full">        
                <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-0.5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="font-bold mr-2 inline w-fit md:text-lg">{eachComment.username}</p>
                </div>    
                {eachComment.postedUser === user.userId &&
                <div className='flex gap-1'>
                    <svg onClick={() => handleCommentEdit(eachComment.commentBody)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 hover:text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>                            
                    <svg onClick={() => deleteAlert(eachComment._id, taskId)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 hover:text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>                               
                }
            </div>     
            {isCommentEdit
            ? <form onSubmit={handleCommentupdate}>
                <textarea 
                rows="2"
                className="block py-1.5 px-2 mt-3 w-full text-sm md:text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="editCommentBody"
                value={editComment} 
                onChange={(e) => setEditComment(e.target.value)} 
                />
                <div className="flex items-center gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 mt-1 py-1 px-5 rounded-lg text-white font-semibold disabled:opacity-25"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={() => setIsCommentEdit(false)}
                    className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none hover:shadow-lg focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 mt-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                    Cansel
                </button>
                </div>                              
            </form>
            :<p className='md:text-lg'>{eachComment.commentBody}</p>
            }                          
        </div>
    </div>
  )
}

export default EachComment