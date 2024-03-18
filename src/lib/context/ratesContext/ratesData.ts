import { createContext } from 'react'

import { RatesType } from '@/lib/interfaces/ratesProps'

export type TabData = {
  isLoading?: boolean
  ratesCrypto?: RatesType[]
  ratesFiat?: RatesType[]
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RatesDataContext = createContext<TabData>({})
