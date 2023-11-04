import { BASE_URL } from "constants/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const loanApi = createApi({
   reducerPath: "loan",
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL + "/v1/loan",
      prepareHeaders(headers) {
         headers.set("Authorization", `Bearer ${localStorage.getItem("tk")}`)
         return headers
      },
   }),
   endpoints(build) {
      return {
         apply: build.mutation({
            query: (body) => ({
               url: "/create",
               method: "POST",
               body,
            }),
         }),
         getLoans: build.query({
            query: (status) => ({
               url: `/loans${status ? `?status=${status}` : ''}`,
               method: "GET",
            })
         })
      }
   }
})

export const {
   useApplyMutation,
   useGetLoansQuery
} = loanApi