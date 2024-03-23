import { Res, api } from '../api'
import { RatesType } from '@/lib/interfaces/ratesProps'

export const ratesEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getRates: builder.query<Res<RatesType[]>, void>({
      query: () => ({
        url: 'rates',
      }),
    }),
  }),
})

export const { useGetRatesQuery } = ratesEndpoints
