import { AssetsParams } from '@/lib/interfaces/assetProps'
import { Res, api } from '../api'
import { RatesType } from '@/lib/interfaces/ratesProps'

export const antreanEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getRates: builder.query<Res<RatesType[]>, AssetsParams>({
      query: ({ search, limit, offset }) => ({
        url: 'rates',
        params: {
          ...(limit !== null && { limit }),
          ...(search?.trim() && { q: search }),
          ...(offset && { offset }),
        },
      }),
    }),
  }),
})

export const { useGetRatesQuery } = antreanEndpoints
