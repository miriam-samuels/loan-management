import { BASE_URL } from "constants/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const mediaApi = createApi({
   reducerPath: "media",
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL + "/v1/media",
      prepareHeaders(headers) {
         headers.set("Authorization", `Bearer ${localStorage.getItem("tk")}`);
         return headers;
      },
   }),
   endpoints(build) {
      return {
         uploadImage: build.mutation({
            query: (body) => ({
               url: "/upload",
               method: "POST",
               body,
            }),
         }),
      };
   },
});

export const { useUploadImageMutation } = mediaApi;