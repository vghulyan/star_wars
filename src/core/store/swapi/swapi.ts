import { createApi, fetchBaseQuery, TagDescription } from '@reduxjs/toolkit/query/react';
import { BASE_SW_API } from 'src/shared/api/endpoints';
import { EntityHttpParams } from 'src/shared/models/http.model';
import { HttpResponse, HttpSearchResponse, HttpSearchResponses, 
  ResultProperty, StarwarsContent, StarwarsPlanet } from 'src/shared/models/starwars.model';
import { PAGE_LIMIT_30 } from 'src/shared/utils/constants';
import { SearchContentQuery } from './swapi.state';

export const speciesSubPath = "species";
export const starshipsSubPath = "starships";
export const vehiclesSubPath = "vehicles";
export const planetsSubPath = "planets";
export const peopleSubPath = "people";

export const speciesTag = "Species";
export const starshipsTag = "Starships";
export const vehiclesTag = "Vehicles";
export const planetsTag = "Planets";
export const peopleTag = "People";

export const searchTag = 'SearchResults';

export const starwarsContentApi = createApi({
  reducerPath: 'swapi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_SW_API
  }),
  tagTypes: [speciesTag, starshipsTag, vehiclesTag, planetsTag, peopleTag, searchTag],
  endpoints: (builder) => ({
    fetchPlanets: builder.query<HttpResponse<StarwarsContent>, EntityHttpParams>({
      query: (params: EntityHttpParams) => {
        return {
          url: `${params.entity}`,
          params: {
            ...params.urlParams,
            limit: PAGE_LIMIT_30,
            page: params.pagination.page ?? 1 // SWAPI is 1 based
          },
          method: 'GET'
        };
      },
      transformResponse: (response: HttpResponse<StarwarsContent>, meta, args: EntityHttpParams) => {
        return response;
      },
      providesTags: (result, error, args, meta) => {
        const tags: TagDescription<"Planets">[] = [];
        result?.results.forEach((res: StarwarsContent) => {
          tags.push({type: planetsTag, id: res.uid});
        });
        tags.push(planetsTag);
        return tags;
      }
    }),

    fetchPlanet: builder.query<HttpSearchResponse<StarwarsPlanet>, string>({
      query: (id: string) => {
        return {
          url: `${planetsSubPath}/${id}`,
          method: 'GET'
        };
      },
      providesTags: (result, error, args, meta) => {
        return [{type: planetsTag, id: args}];
      }
    }),

    // General Search
    searchContent: builder.query<ResultProperty<any>[], SearchContentQuery>({
      query: (args: SearchContentQuery) => {
        return {
          url: `${args.entity}`,
          params: {
            name: args.name ?? `${''}`
          },
          method: 'GET'
        };
      },
      providesTags: () => {
        return [searchTag];
      },
      transformResponse: (response: HttpSearchResponses<any>) => {
        return response.result;
      }
    })
  })
});


export const { useSearchContentQuery, useFetchPlanetsQuery, useFetchPlanetQuery} = starwarsContentApi;