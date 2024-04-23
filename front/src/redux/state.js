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
        },
        // Action to update user logout state
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        // Action to update listings state
        setListings: (state, action) => {
            state.listings = action.payload.listings
        },
        // Action to update tripList state nested under user state
        setTripList: (state, action) => {
            state.user.tripList = action.payload
        },
        // Action to update wishList state nested under user state
        setWishList: (state, action) => {
            state.user.wishList = action.payload
        }
    }
})

export const { setLogin, setLogout, setListings, setTripList, setWishList } = userSlice.actions
export default userSlice.reducer