import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../redux/slicers/authSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})