import { createSlice } from "@reduxjs/toolkit"

export const projectidSlice = createSlice({
    name: "dashboardState",
    initialState: {
        projectId: null
    },
    reducers: {
        setProjectId: (state, action) => {
            state.projectId = action.payload
        }
    }
})

export const { setProjectId } = projectidSlice.actions

export default projectidSlice.reducer