import { createSlice } from "@reduxjs/toolkit"

export const dashboardStateSlice = createSlice({
    name: "dashboardState",
    initialState: {
        dashboardState: false
    },
    reducers: {
        setDashboardState: (state) => {
            state.dashboardState = !(state.dashboardState)
        }
    }
})

export const { setDashboardState } = dashboardStateSlice.actions

export default dashboardStateSlice.reducer