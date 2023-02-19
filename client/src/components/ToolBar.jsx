import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setDashboardState } from "../redux/slicers/dashboardSlice"
import ProjectsDropdpwn from './ProjectsDropdown'


const ToolBar = ({ projects, setProjectId }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const dashBoardState = useSelector((state) => state.dashboard.dashboardState)

    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const response = await fetch(
                'http://localhost:8000/dashboard/getallprojects',
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
                setProjectList(result.allProjects)
                }
            } catch (error) {
                console.log(error);
            }
        }
        // fetchAllProjects()
    }, [dashBoardState])


    

  return (
    <div className='flex'>
        <ProjectsDropdpwn projects={projects} setProjectId={setProjectId}/>

    </div>
  )
}

export default ToolBar