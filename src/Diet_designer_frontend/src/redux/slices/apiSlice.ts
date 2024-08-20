import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
// import { getCookie } from "cookies-next";

const { baseUrl } = config;
console.log(baseUrl);
const baseQuery = fetchBaseQuery({
  baseUrl,
  // prepareHeaders: (headers) => {
  //   const token = getCookie("USER");
  //   headers.set("Authorization", `Bearer ${token}`);
  // headers.set("accept", "application/json");
  // if(!headers.has("Content-Type")){
  //   headers.set("Content-Type","");
  // }
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    registerLagosAttendee: builder.mutation({
      query: (body) => ({
        url: `user/create-attendee-lagos`,
        method: "POST",
        body: body,
      }),
    }),
    registerLagosVendor: builder.mutation({
      query: (body) => ({
        url: `user/vendor-create-lagos`,
        method: "POST",
        body: body,
      }),
    }),
    verifyDonation: builder.mutation({
      query: (body) => ({
        url: `order/verify`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useRegisterLagosAttendeeMutation,
  useRegisterLagosVendorMutation,
  useVerifyDonationMutation,
} = apiSlice;
