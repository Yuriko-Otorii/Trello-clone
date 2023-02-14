import { useState } from 'react'

import TaskCard from './TaskCard'

const Board = ({ setShowNewTaskModal, boardInfo, setShowDetailModal, setUpdateState, updateState }) => {
    const [isTitleEdit, setIsTitleEdit] = useState(false)
    const [boardTitle, setBoardTitle] = useState(boardInfo.boardTitle)

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
                    setUpdateState(!updateState)
                }
              } catch (error) {
                console.log(error);
              }
        }
    }

  return (
    <div className='py-3 px-4 m-auto md:m-0 rounded-lg shadow-lg w-11/12 h-fit bg-gray-200 md:w-80'>
        <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
                {/* {isTitleEdit
                    ? <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-gray-700 leading-tight focus:border-blue-200 focus:shadow-outline"
                        type="text"
                        name="boardTitle"
                        placeholder="Board title"
                        onChange={(e) => setBoardTitle(e.target.value)}
                        value={boardTitle}
                    />
                    : <h2 className='font-bold text-xl ml-1'>{boardInfo.boardTitle}</h2>
                } */}
                <h2 className='font-bold text-xl ml-1'>{boardInfo.boardTitle}</h2>
                <div className='group rerative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <ul className="absolute right-12 hidden w-24 text-gray-700 bg-gray-100 group-hover:block rounded-lg">
                        <li onClick={() => setIsTitleEdit(!isTitleEdit)}>
                            <a href="#" className="rounded-t bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Edit title</a>
                        </li>
                        <li onClick={() => deleteAlert(boardInfo.boardTitle, boardInfo._id)}>
                            <a href="#" className="rounded-b bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Delete</a>
                        </li>
                    </ul>
                </div>
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