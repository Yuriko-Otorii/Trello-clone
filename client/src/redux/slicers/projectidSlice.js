import { createSlice } from "@reduxjs/toolkit"

export const projectidSlice = createSlice({
    name: "dashboardState",
    initialState: {
        projectId: null
    },
    reducers: {
        setProjectIdAction: (state, action) => {
            state.projectId = action.payload
        }
    }
})

export const { setProjectIdAction } = projectidSlice.actions

export default projectidSlice.reducer