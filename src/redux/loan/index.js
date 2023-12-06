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
         review: build.mutation({
            query: (body) => ({
               url: "/review",
               method: "PATCH",
               body,
            }),
         }),
         getLoans: build.query({
            query: (status) => ({
               url: `/all${status ? `?status=${status}` : ''}`,
               method: "GET",
            })
         }),
         getApplication: build.query({
            query: (id) => ({
               url: `/${id}`,
               method: "GET",
            })
         })
      }
   }
})

export const {
   useApplyMutation,
   useGetLoansQuery,
   useGetApplicationQuery,
   useReviewMutation,
} = loanApi