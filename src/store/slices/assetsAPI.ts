import {
  AssetsHistoryParams,
  AssetsHistoryType,
  AssetsMarketType,
  AssetsParams,
  AssetsType,
} from '@/lib/interfaces/assetProps'
import { Res, api } from '../api'

export const assetsEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<Res<AssetsType[]>, AssetsParams>({
      query: ({ search, limit, offset }) => ({
        url: 'assets',
        params: {
          ...(search !== null && { search }),
          ...(limit && { limit }),
          ...(offset && { offset }),
        },
      }),
    }),
    getAssetsById: builder.query<Res<AssetsType>, AssetsParams>({
      query: ({ id }) => ({
        url: `assets/${id}`,
      }),
    }),
    getAssetsHistory: builder.query<
      Res<AssetsHistoryType[]>,
      AssetsHistoryParams
    >({
      query: ({ id, interval, start, end }) => ({
        url: `assets/${id}/history`,
        params: {
          interval: interval,
          ...(start && { start }),
          ...(end && { end }),
        },
      }),
    }),
    getAssetsMarket: builder.query<Res<AssetsMarketType[]>, AssetsParams>({
      query: ({ id, limit, offset }) => ({
        url: `assets/${id}/markets`,
        params: {
          ...(limit && { limit }),
          ...(offset && { offset }),
        },
      }),
    }),
  }),
})

export const {
  useGetAssetsQuery,
  useGetAssetsByIdQuery,
  useGetAssetsHistoryQuery,
  useGetAssetsMarketQuery,
} = assetsEndpoints
