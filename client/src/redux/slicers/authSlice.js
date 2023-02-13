import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        // user: null
        user: {
            email: "test@test.com",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTZiZWVlOWVhYjhjZjAyMjUzYzYzMyIsImlhdCI6MTY3NjI2NjM1NH0.oZ-9unwgrUeeIpghb6JleQmO0_PmEFgBKcGdzLSfSCk",
            userId: "63e6beee9eab8cf02253c633",
            username: "test"
        }
    },
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer