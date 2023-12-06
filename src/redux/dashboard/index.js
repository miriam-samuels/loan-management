import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "constants/urls";


export const dashboardApi = createApi({
   reducerPath: "dashboardApi",
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL + "/v1/dashboard",
      prepareHeaders(headers) {
         headers.set("Authorization", `Bearer ${localStorage.getItem("tk")}`)
         return headers
      },
   }),
   endpoints(build) {
      return {
         getLoanStats: build.query({
            query: (period) => ({
               url: `/stats${period ? `?period=${period}` : ''}`,
               method: "GET",
            })
         })
      }
   }
})

export const {
   useGetLoanStatsQuery
} = dashboardApi