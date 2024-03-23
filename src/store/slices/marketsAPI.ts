import { Res, api } from '../api'
import { MarketsParams, MarketsType } from '@/lib/interfaces/marketsProps'

export const marketsEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getMarkets: builder.query<Res<MarketsType[]>, MarketsParams>({
      query: ({
        exchangeId,
        baseSymbol,
        baseId,
        quoteSymbol,
        quoteId,
        assetSymbol,
        assetId,
        limit,
        offset,
      }) => ({
        url: 'markets',
        params: {
          ...(exchangeId && { exchangeId }),
          ...(baseSymbol && { baseSymbol }),
          ...(baseId && { baseId }),
          ...(quoteSymbol && { quoteSymbol }),
          ...(quoteId && { quoteId }),
          ...(assetSymbol && { assetSymbol }),
          ...(assetId && { assetId }),
          ...(limit && { limit }),
          ...(offset && { offset }),
        },
      }),
    }),
  }),
})

export const { useGetMarketsQuery } = marketsEndpoints
