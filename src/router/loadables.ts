import loadable from '@loadable/component'

export const NotFound = loadable(() => import('@/pages/not-found'))
export const Homepage = loadable(() => import('@/pages/homepage'))
export const DetailAssets = loadable(
  () => import('@/pages/homepage/detailAssets'),
)
export const Exchange = loadable(() => import('@/pages/exchange'))
export const Market = loadable(() => import('@/pages/market'))
