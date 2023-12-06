import { configureStore } from '@reduxjs/toolkit'
import { loggedSlice } from 'redux/auth';
// import counterReducer from '../features/counter/counterSlice'
import { authApi } from "redux/auth";
import { borrowerApi } from 'redux/borrower';
import { dashboardApi } from 'redux/dashboard';
import { loanApi } from 'redux/loan';
import { mediaApi } from 'redux/media';
import { userApi } from 'redux/user';

export const store = configureStore({
   reducer: {
       logged: loggedSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [loanApi.reducerPath]: loanApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [mediaApi.reducerPath]: mediaApi.reducer,
      [dashboardApi.reducerPath]: dashboardApi.reducer,
      [borrowerApi.reducerPath]: borrowerApi.reducer,
   },
   middleware: (getDefaultMiddleware) => {
      const mids = getDefaultMiddleware().concat([
         authApi.middleware,
         loanApi.middleware,
         userApi.middleware,
         mediaApi.middleware,
         dashboardApi.middleware,
         borrowerApi.middleware,
      ])
      return mids;
   },
})