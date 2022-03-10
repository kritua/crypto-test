import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IMetaItem {
    base: string,
    baseAddress: string,
    counterAddress: string,
    counter: string,
    poolAddress: string,
    fee: string
}

export const main = createApi({
    reducerPath: 'api/main',
    tagTypes   : ['main'],
    baseQuery  : fetchBaseQuery({
        baseUrl: '/v1'
    }),
    endpoints: (build) => ({
        getPairs: build.query<Array<IMetaItem>, undefined>({
            providesTags     : ['main'],
            transformResponse: (resp: Array<IMetaItem>) => {
                return resp.filter((item) => item.counter.includes('USDT'));
            },
            query: (params) => ({
                url   : 'pairs/meta',
                method: 'GET',
                params
            })
        }),
        getCurrenciesById: build.query({
            providesTags: ['main'],
            query       : ({ id }: { id: string }) => ({
                url   : `currencies/${id}`,
                method: 'GET'
            })
        })
    })
});
