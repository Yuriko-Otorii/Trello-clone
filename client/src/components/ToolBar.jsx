import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilterTasks from './FilterTasks'

import { setDashboardState } from "../redux/slicers/dashboardSlice"
import ProjectsDropdpwn from './ProjectsDropdown'


const ToolBar = ({ setFilterValue }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const dashBoardState = useSelector((state) => state.dashboard.dashboardState)

    useEffect(() => {
       
    }, [dashBoardState])


    

  return (
    <div className='flex w-full'>
        <FilterTasks setFilterValue={setFilterValue} />
    </div>
  )
}

export default ToolBar