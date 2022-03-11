import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IMetaItem {
    base: string,
    baseAddress: string,
    counterAddress: string,
    counter: string,
    poolAddress: string,
    fee: string
}

export interface IPostPairRequestResponse {
    fee7d: string,
    fee24h: string,
    feeAllTime: string,
    leftLocked: string,
    leftPrice: string,
    meta: IMetaItem,
    rightLocked: string,
    rightPrice: string,
    tvl: string,
    tvlChange: string,
    volume7d: string,
    volume24h: string,
    volumeChange24h: string
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
                return resp.filter((item) => item.counter === 'USDT');
            },
            query: (params) => ({
                url   : 'pairs/meta',
                method: 'GET',
                params
            })
        }),
        postCurrenciesById: build.mutation<IPostPairRequestResponse, { address: string }>({
            invalidatesTags: ['main'],
            query          : ({ address }: { address: string }) => ({
                url   : `pairs/address/${address}`,
                method: 'POST'
            })
        })
    })
});
