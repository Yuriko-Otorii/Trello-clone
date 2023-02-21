import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Board from '../components/Board'
import DetailPageModal from '../components/DetailPageModal'
import HamburgerMenu from '../components/HamburgerMenu'
import NewBoardModal from '../components/NewBoardModal'
import NewTaskModal from '../components/NewTaskModal'
import NewProjectModal from '../components/NewProjectModal';
import ToolBar from '../components/ToolBar';
import ProjectsDropdown from '../components/ProjectsDropdown';
import FilterTasks from '../components/FilterTasks';
import { setDashboardState } from "../redux/slicers/dashboardSlice"
import { useNavigate } from 'react-router-dom';


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
  const [filterValue, setFilterValue] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [updateState, setUpdateState] = useState(false)
  const [mobileMenuState, setMobileMenuState] = useState({})
  const user = useSelector((state) => state.auth.user)
  const projectId = useSelector((state) => state.projectId.projectId)
  const dashBoardState = useSelector((state) => state.dashboard.dashboardState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllBoards = async (projectId, selectedValue) => {
      try {
        const response = await fetch(
          // `https://task-manager-kymn.onrender.com/dashboard/getallboards`,
          'http://localhost:8000/dashboard/getallboards',
          {
            method: 'POST',
            body: JSON.stringify({ projectId, userId: user.userId, selectedValue }),
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
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(true)
    fetchAllBoards(projectId, filterValue)

  }, [dashBoardState])


  //Drag and drop logics
  const onDragEnd = async (result) => {
      const { destination, source, type } = result
      const startIndex = source.index
      const startId = source.droppableId
      
      if(!destination) return

      //Dragging board
      if(type === "board"){  
        const newBoardList = project.boards
        const draggedBoard = newBoardList.splice(startIndex, 1)
        newBoardList.splice(destination.index, 0, ...draggedBoard)
        
        try {
          const response = await fetch(
            'http://localhost:8000/dashboard/updateboardorder',
            {
              method: 'POST',
              body: JSON.stringify({ projectId: project._id, newBoardList }),
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
      if(type === "DEFAULT"){
        if(startId === destination.droppableId){
          const targetBoard = project.boards.find(eachBoard => eachBoard._id === startId)
          const draggedTask = targetBoard.tasks.splice(startIndex, 1)
          targetBoard.tasks.splice(destination.index, 0, ...draggedTask)
  
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
        else if (startId !== destination.droppableId){
          const startBoard = project.boards.find(eachBoard => eachBoard._id === startId)
          const endBoard = project.boards.find(eachBoard => eachBoard._id === destination.droppableId)
          const removeDraggedTask = startBoard.tasks.splice(startIndex, 1)
          endBoard.tasks.splice(destination.index, 0, ...removeDraggedTask)
  
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
  }

  return (
    <div className="flex relative h-full min-h-screen w-fit min-w-full md:h-fit p-4">
      <div className="overlay absolute inset-0 z-0 bg-gradient-to-r from-teal-400 to-yellow-200 opacity-20"></div>
      {isLoading
        ? <div className='flex justify-center items-center w-full'>
            <div role="status">
                <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
          </div> 
        : <>
          <div className="w-full flex flex-col z-40">
            <div className="flex justify-between items-center w-full h-12 px-5 py-2 md:hidden">
              {project  
                ? <p className='text-gray-900 font-bold text-lg'>{project.projectTitle}</p>
                : <ProjectsDropdown  projects={projects}  />
              }

              {
                mobileMenuState.selectProjects && 
                  <div className='flex items-center md:hidden'>                
                    <ProjectsDropdown projects={projects}  />
                    <svg onClick={() => setMobileMenuState("")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1 md:hidden text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
              }
              {
                mobileMenuState.filterTasks && 
                  <div className='md:hidden'>                
                    <FilterTasks setFilterValue={setFilterValue} setMobileMenuState={setMobileMenuState} />                  
                  </div>
              }

              <div className="">
                <HamburgerMenu project={project} setShowNewProjectModal={setShowNewProjectModal} setMobileMenuState={setMobileMenuState} />
              </div>
            </div>
            
            <div className="flex items-center px-5 py-2 w-full hidden md:flex">
              {project && 
                <div className='flex items-center'>
                  <svg onClick={() => navigate("/")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <div className='text-gray-600 text-2xl mr-4'>{project.projectTitle}</div>
                </div>
              }
                <div className='flex'>
                  {!project &&
                    <div className='flex items-center'>
                      <svg onClick={() => navigate("/")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                      <ProjectsDropdown projects={projects} />
                    </div>
                  }
                  {project && 
                    <ToolBar setFilterValue={setFilterValue} setShowNewProjectModal={setShowNewProjectModal}/>
                  }
                </div>
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
                    className="flex w-56 items-center justify-center inline-block px-1 py-5 border-2 border-gray-400 text-gray-500 font-medium text-xs md:text-base leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
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

