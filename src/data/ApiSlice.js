import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bingoApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://roadtrip-bingo-hul76.ondigitalocean.app/api", // Pas dit aan naar je eigen API basis URL als nodig
  }),
  endpoints: (builder) => ({
    getThemes: builder.query({
      query: () => "/themas",
    }),
    getThemeWords: builder.query({
      query: (themeId) => `/woorden/thema/${themeId}`,
    }),
  }),
});

export const { useGetThemesQuery, useGetThemeWordsQuery } = bingoApi;
export default bingoApi;
