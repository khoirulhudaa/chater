import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    auth: {},
    token: ''
}

const authSlice: any = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authSignIn: (state, action: PayloadAction<any>) => {
            state.auth = {
                ...state.auth,
                ...action.payload
            }
        },
        saveToken: (state, action: PayloadAction<any>) => {
            state.token = action.payload
        },
        authSignOut: (state) => {
            state.auth = {}
        }
    }
})

export const { authSignIn, saveToken, authSignOut } = authSlice.actions
export default authSlice.reducer