
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from "../../constants/urls";

// api query
export const authApi = createApi({
   reducerPath: "auth",
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/v1/auth" }),
   endpoints(build) {
      return {
         // register user
         register: build.mutation({
            query: (body) => ({
               url: "/signup",
               method: "POST",
               body,
            }),
         }),
         // sign in user
         login: build.mutation({
            query: (body) => ({
               url: "/signin",
               method: "POST",
               body,
            }),
         })
      };
   },
});

export const {
   useRegisterMutation,
   useLoginMutation,
} = authApi;


// auth api slice
const initialState = {
   data: JSON.parse(localStorage.getItem('ud') || "null")
}

export const loggedSlice = createSlice({
   name: "logged",
   initialState,
   reducers: {
      // store user details
      setLogged(state, action) {
         state.data = action.payload;
      },

      logout(state) {
         localStorage.removeItem("tk");
         localStorage.removeItem("ud");
         state.data = null;
         setLogged({})
      },
   },
});

export const { setLogged, logout } = loggedSlice.actions;

export const selectLogged = (state) => state.logged.data;

export default loggedSlice.reducer;
