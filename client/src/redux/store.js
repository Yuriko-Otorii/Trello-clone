import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../redux/slicers/authSlice"
import dashboardStateReducer from "../redux/slicers/dashboardSlice"
import projectidReducer from "../redux/slicers/projectidSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardStateReducer,
        projectId: projectidReducer
    }
})