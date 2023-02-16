import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setDashboardState } from "../redux/slicers/dashboardSlice"

import TaskCard from './TaskCard'

const Board = ({ setShowNewTaskModal, boardInfo, setShowDetailModal }) => {
    const [isTitleEdit, setIsTitleEdit] = useState(false)
    const [boardTitle, setBoardTitle] = useState(boardInfo.boardTitle)
    const dispatch = useDispatch()

    const handleBoardTitleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:8000/dashboard/updateboardtitle', {
            method: 'POST',
            body: JSON.stringify({ boardTitle, boardId: boardInfo._id}),
            headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) {
                console.log('Something went wrong...')
            } else {
                setIsTitleEdit(false)
                dispatch(setDashboardState())
            }            
        } catch (error) {
            console.log(error);
        }        
    }

    const handleNewTask = (boardId) => {
        setShowNewTaskModal({
            boardId: boardId,
            modalState: true
        })
    }

    const deleteAlert = async (boardTitle, boardId) => {
        const msg = `Are you sure delete board "${boardTitle}"?`
        const result = confirm(msg)
        if(result){
            try {
                const response = await fetch('http://localhost:8000/dashboard/deleteboard', {
                  method: 'POST',
                  body: JSON.stringify({ boardId }),
                  headers: { 'Content-Type': 'application/json' },
                })
                
                if (!response.ok) {
                  console.log('Something went wrong...')
                } else {
                    dispatch(setDashboardState())
                }
              } catch (error) {
                console.log(error);
              }
        }
    }

  return (
    <div className='py-3 px-4 m-auto md:m-0 rounded-lg shadow-lg w-11/12 h-fit bg-gray-200 md:w-80'>
        <div className='flex flex-col'>
            <div className='flex justify-between items-center h-8'>
                {isTitleEdit
                    ?
                    <form onSubmit={handleBoardTitleSubmit} className="flex items-center w-full">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-200 focus:shadow-outline"
                            type="text"
                            name="boardTitle"
                            placeholder="Board title"
                            onChange={(e) => setBoardTitle(e.target.value)}
                            value={boardTitle}
                        />
                        <button
                            type="submit"
                            disabled={!(boardTitle)}
                            className="bg-emerald-400 text-white active:bg-emerald-500 uppercase text-sm px-3 py-2 rounded shadow hover:text-emerald-700 outline-none focus:outline-none ml-1 ease-linear transition-all duration-150 disabled:opacity-50"
                            >
                            Save
                        </button>
                    </form>
                    : <>
                        <h2 className='font-bold text-xl ml-1'>{boardInfo.boardTitle}</h2>
                        <div className='flex gap-2'>
                            <svg onClick={() => setIsTitleEdit(!isTitleEdit)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 hover:text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>                            
                            <svg onClick={() => deleteAlert(boardInfo.boardTitle, boardInfo._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 hover:text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                      </>
                }
                
                    
                    
            </div>
            {boardInfo.tasks.length > 0 && (
                boardInfo.tasks.map(eachTask => <TaskCard key={eachTask._id} taskInfo={eachTask} setShowDetailModal={setShowDetailModal} />)
            )}
            <div className='flex justify-center mt-7'>
                <button onClick={() => handleNewTask(boardInfo._id)} type='button' className='flex w-1/2 items-center justify-center inline-block p-1 border-2 border-gray-400 text-gray-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    New task
                </button>
            </div>
        </div>
    </div>
  )
}

export default Board