import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import { authApi } from "redux/auth";
import { loanApi } from 'redux/loan';

export const store =  configureStore({
   reducer: {
      //  counter: counterReducer
      [authApi.reducerPath]: authApi.reducer,
      [loanApi.reducerPath]: loanApi.reducer,
   },
   middleware: (getDefaultMiddleware) => {
      const mids = getDefaultMiddleware().concat([
         authApi.middleware,
         loanApi.middleware,
      ])
      return mids;
   },
})