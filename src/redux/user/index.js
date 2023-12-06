const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/dist/query/react");
const { BASE_URL } = require("constants/urls");

export const userApi = createApi({
   reducerPath: "user",
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL + "/v1/profile",
      prepareHeaders(headers) {
         headers.set("Authorization", `Bearer ${localStorage.getItem("tk")}`)
         return headers
      },
   }),
   endpoints(build) {
      return {
         getProfile: build.query({
            query: () => ({
               url: "/me",
               method: "GET"
            })
         }),
         updateProfile: build.mutation({
            query: (body) => ({
               url: "/",
               method: "PATCH",
               body
            })
         })
      }
   }
})

export const {
   useGetProfileQuery,
   useLazyGetProfileQuery,
   useUpdateProfileMutation,

} = userApi