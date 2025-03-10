import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    rooms: [],
    roomDetail: {},
}

const roomSlice: any = createSlice({
    name: 'room',
    initialState,
    reducers: {
        getRooms: (state, action: PayloadAction<any>) => {
            state.rooms = {
                ...state.rooms,
                ...action.payload
            }
        },
        roomDetail: (state, action: PayloadAction<any>) => {
            state.roomDetail = action.payload
        },
        clearRoom: (state) => {
            state.rooms = []
            state.roomDetail = {}
        }
    }
})

export const { getRooms, roomDetail, clearRoom } = roomSlice.actions
export default roomSlice.reducer