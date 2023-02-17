import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Board from '../components/Board'
import DetailPageModal from '../components/DetailPageModal'
import HamburgerMenu from '../components/HamburgerMenu'
import NewBoardModal from '../components/NewBoardModal'
import NewTaskModal from '../components/NewTaskModal'

import { setDashboardState } from "../redux/slicers/dashboardSlice"


const DashBoard = () => {
  const [showNewBoardModal, setShowNewBoardModal] = useState(false)
  const [showNewTaskModal, setShowNewTaskModal] = useState({
    boardId: null,
    modalState: false,
  })
  const [showDetailModal, setShowDetailModal] = useState({
    taskId: null,
    boardId: null,
    modalState: false,
  })
  const [allBoards, setAllboads] = useState([])
  const [updateState, setUpdateState] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const dashBoardState = useSelector((state) => state.dashboard.dashboardState)

  useEffect(() => {
    const fetchAllBoards = async () => {
      try {
        const response = await fetch(
          // `https://task-manager-kymn.onrender.com/dashboard/getallboards`,
          'http://localhost:8000/dashboard/getallboards',
          {
            method: 'POST',
            body: JSON.stringify({ userId: user.userId }),
            headers: { 'Content-Type': 'application/json' },
          },
        )
        if (!response.ok) {
          console.log('Something went wrong...')
        } else {
          const result = await response.json()
          setAllboads(result.allBoards)
          // console.log(result.allBoards);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllBoards()
  }, [dashBoardState])

  const onDragEnd = async (result) => {
    console.log({result});
    const { destination, source, type } = result
      const startIndex = source.index
      const startId = source.droppableId
      const endIndex = destination.index
      const endId = destination.droppableId
      
      if(!destination) return

      //Dragging board
      if(type === "board"){
        const startBoard = allBoards.splice(startIndex, 1)
        allBoards.splice(endIndex, 0, ...startBoard)

        try {
          const response = await fetch(
            'http://localhost:8000/dashboard/updateboardorder',
            {
              method: 'POST',
              body: JSON.stringify({ boardList }),
              headers: { 'Content-Type': 'application/json' },
            },
          )
          if (!response.ok) {
            console.log('Something went wrong...')
          } else {
            dispatch(setDashboardState())
          }
        } catch (error) {
          console.log(error);
        }
      }

      // Dropped in the same board
      if(startId === endId){
        const targetBoard = allBoards.find(eachBoard => eachBoard._id === startId)
        const draggedTask = targetBoard.tasks.splice(startIndex, 1)
        targetBoard.tasks.splice(endIndex, 0, ...draggedTask)

        try {
          const response = await fetch(
            'http://localhost:8000/dashboard/updatetaskorder',
            {
              method: 'POST',
              body: JSON.stringify({ boardId: targetBoard._id, newTaskList: targetBoard.tasks }),
              headers: { 'Content-Type': 'application/json' },
            },
          )
          if (!response.ok) {
            console.log('Something went wrong...')
          } else {
            dispatch(setDashboardState())
          }
        } catch (error) {
          console.log(error);
        }
      }

      //Dropped in the other board
      else if (startId !== endId){
        const startBoard = allBoards.find(eachBoard => eachBoard._id === startId)
        const endBoard = allBoards.find(eachBoard => eachBoard._id === endId)
        const removeDraggedTask = startBoard.tasks.splice(startIndex, 1)
        endBoard.tasks.splice(endIndex, 0, ...removeDraggedTask)

        try {
          const response = await fetch(
            'http://localhost:8000/dashboard/updatetaskorderbetween',
            {
              method: 'POST',
              body: JSON.stringify({ 
                      startBoardId: startBoard._id,
                      startTaskList: startBoard.tasks,
                      endBoardId: endBoard._id,
                      endTaskList: endBoard.tasks,
                      
                    }),
              headers: { 'Content-Type': 'application/json' },
            },
          )
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
    <div className="flex relative h-full min-h-screen w-fit min-w-full md:h-fit p-4">
      <div className="overlay absolute inset-0 z-0 bg-gradient-to-r from-teal-400 to-yellow-200 opacity-20"></div>
      <div className="w-full flex flex-col z-40">
        <div className="flex justify-between items-center">
          <div className="md:hidden"></div>
          <div className="md:order-2"></div>
          <div className="md:order-1">
            <HamburgerMenu />
          </div>
        </div>
          <div className="flex pt-3">
            <DragDropContext onDragEnd={onDragEnd} >
                <Droppable droppableId="allBoards" direction='horizontal' type="board">
                  {provided => 
                      <div {...provided.droppableProps} ref={provided.innerRef} className="flex items-start flex-col gap-4 w-full md:flex-row md:w-fit">
                        {allBoards.length > 0 &&
                        allBoards.map((eachBoard, index) => (
                          <Board
                            key={eachBoard._id}
                            boardInfo={eachBoard}
                            setShowNewTaskModal={setShowNewTaskModal}
                            setShowDetailModal={setShowDetailModal}
                            index={index}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                  }
                </Droppable>                
            </DragDropContext>
            <div className="flex justify-center ml-12 mr-4 hidden md:block">
              <button
                onClick={() => setShowNewBoardModal(true)}
                type="button"
                className="flex w-40 py-10 px-5 items-center justify-center inline-block p-1 border-2 border-gray-400 text-gray-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                New board
              </button>
            </div>                 
          </div>
        <div className="flex justify-center mt-10 md:hidden">
          <button
            onClick={() => setShowNewBoardModal(true)}
            type="button"
            className="flex w-56 items-center justify-center inline-block px-1 py-5 border-2 border-gray-400 text-gray-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New board
          </button>
        </div>
      </div>
      {showNewBoardModal && (
        <NewBoardModal
          setShowNewBoardModal={setShowNewBoardModal}
        />
      )}
      {showNewTaskModal.modalState && (
        <NewTaskModal
          setShowNewTaskModal={setShowNewTaskModal}
          boardId={showNewTaskModal.boardId}
        />
      )}
      {showDetailModal.modalState && (
        <DetailPageModal
          setShowDetailModal={setShowDetailModal}
          taskId={showDetailModal.taskId}
          boardId={showDetailModal.boardId}          
          updateState={updateState}
          setUpdateState={setUpdateState}
        />
      )}
    </div>
  )
}

export default DashBoard
