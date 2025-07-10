import { configureStore } from '@reduxjs/toolkit'
import AdminSlice from './admin/slice'
import {MainQueries} from '../store/Api/Api'
export const Store = configureStore({
  reducer: {

    AdminSlice: AdminSlice,
    [MainQueries.reducerPath] : MainQueries.reducer
  },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MainQueries.middleware),

})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch