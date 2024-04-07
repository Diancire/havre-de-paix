import { createSlice } from "@reduxjs/toolkit"

// Define initial state of Redux slice
const initialState = {
    user: null,
    token: null
}

// Create Redux slice to manage user login state
export const userSlice = createSlice ({
    name: "user", 
    initialState,
    reducers: {
        // Action to update user login state
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        }
    }
})

export const { setLogin } = userSlice.actions
export default userSlice.reducer