import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Board from '../components/Board'
import DetailPageModal from '../components/DetailPageModal'
import HamburgerMenu from '../components/HamburgerMenu'
import NewBoardModal from '../components/NewBoardModal'
import NewTaskModal from '../components/NewTaskModal'

import { setDashboardState } from "../redux/slicers/dashboardSlice"
import NewProjectModal from '../components/NewProjectModal';
import ProjectsDropdown from '../components/ProjectsDropdown';
import ToolBar from '../components/ToolBar';


const DashBoard = () => {
  const [showNewBoardModal, setShowNewBoardModal] = useState(false)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [showNewTaskModal, setShowNewTaskModal] = useState({
    boardId: null,
    modalState: false,
  })
  const [showDetailModal, setShowDetailModal] = useState({
    taskId: null,
    boardId: null,
    modalState: false,
  })
  const [project, setProject] = useState([])
  const [projects, setProjects] = useState([])
  const [projectId, setProjectId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [updateState, setUpdateState] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const dashBoardState = useSelector((state) => state.dashboard.dashboardState)

  useEffect(() => {
    const fetchAllBoards = async (projectId) => {
      try {
        const response = await fetch(
          // `https://task-manager-kymn.onrender.com/dashboard/getallboards`,
          'http://localhost:8000/dashboard/getallboards',
          {
            method: 'POST',
            body: JSON.stringify({ projectId, userId: user.userId }),
            headers: { 'Content-Type': 'application/json' },
          },
        )
        if (!response.ok) {
          console.log('Something went wrong...')
        } else {
          const result = await response.json()
          setProject(result.allBoards)
          setProjects(result.allProjects)
          setIsLoading(false)
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(true)
    fetchAllBoards(projectId)
  }, [dashBoardState])


  const onDragEnd = async (result) => {
      const { destination, source, type } = result
      const startIndex = source.index
      const startId = source.droppableId
      const endIndex = destination.index
      const endId = destination.droppableId
      
      if(!destination) return

      //Dragging board
      if(type === "board"){
        const startBoard = project.boards.splice(startIndex, 1)
        project.boards.splice(endIndex, 0, ...startBoard)

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
        const targetBoard = project.boards.find(eachBoard => eachBoard._id === startId)
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
        const startBoard = project.boards.find(eachBoard => eachBoard._id === startId)
        const endBoard = project.boards.find(eachBoard => eachBoard._id === endId)
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
      {isLoading
        ? <p>Loading...</p>
        : <>
          <div className="w-full flex flex-col z-40">
            <div className="flex justify-between items-center px-5 py-2 md:hidden">
              {project && 
                <div className='text-gray-600 '>{project.projectTitle}</div>
              }
              <div className="">
                <HamburgerMenu setShowNewProjectModal={setShowNewProjectModal} />
              </div>
            </div>
            <div className="flex items-center px-5 py-2 hidden md:flex">
              {project && 
                <div className='text-gray-600 '>{project.projectTitle}</div>
              }          
              <ToolBar projects={projects} setProjectId={setProjectId} />
            </div>
            {project && 
            <>
              <div className='flex justify-center items-center flex-col md:flex-row md:justify-start md:items-start'>
              <div className="flex justify-center items-center pt-3 md:px-4 md:items-start md:justify-start">
                <DragDropContext onDragEnd={onDragEnd} >
                  <Droppable droppableId="allBoards" direction='horizontal' type="board">
                    {provided => 
                        <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-4 md:flex-row">
                          {project.hasOwnProperty('boards') && project.boards.length > 0 &&
                          project.boards.map((eachBoard, index) => (
                            <Board
                              key={eachBoard._id}
                              boardInfo={eachBoard}
                              projectId={projectId}
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
              </div>
              <div className="flex justify-center mt-10 md:mt-3">
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
            </>
            }
                        
          </div>
          {showNewBoardModal && (
            <NewBoardModal
              setShowNewBoardModal={setShowNewBoardModal}
              projectId={project._id}
            />
          )}
          {showNewProjectModal && (
            <NewProjectModal
              setShowNewProjectModal={setShowNewProjectModal}
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
        </>
      }
    </div> 
    
  )
}

export default DashBoard


//flex items-center justify-center flex-col gap-4 w-full md:flex-row md:items-start md:w-fit