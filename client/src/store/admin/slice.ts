import { createSlice } from "@reduxjs/toolkit";

export interface AdminDataState {
   loading: boolean,
    isAdmin: boolean
}


const initialState: AdminDataState = {
   loading: true,
    isAdmin: false,
}


const AdminSlice = createSlice({
    name: "adminslice",
    initialState,
    reducers: ({
        setAdminState : (action , payload) => {
            action.isAdmin = payload.payload
            action.loading = false
        }
    })

})

export default AdminSlice.reducer
export const {setAdminState} = AdminSlice.actions