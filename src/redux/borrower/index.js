const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/dist/query/react");
const { BASE_URL } = require("constants/urls");

export const borrowerApi = createApi({
   reducerPath: "borrower",
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL + "/v1/borrower",
      prepareHeaders(headers) {
         headers.set("Authorization", `Bearer ${localStorage.getItem("tk")}`)
         return headers
      },
   }),
   endpoints(build) {
      return {
         getBorrowers: build.query({
            query: () => ({
               url: "/all",
               method: "GET"
            })
         }),
         getBorrower: build.query({
            query: (id) => ({
               url: `/${id}`,
               method: "GET"
            })
         }),
      }
   }
})

export const {
   useLazyGetBorrowersQuery,
   useGetBorrowerQuery,

} = borrowerApi