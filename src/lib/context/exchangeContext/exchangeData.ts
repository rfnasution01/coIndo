import { ExchangeType } from '@/lib/interfaces/exchangesProps'
import { createContext } from 'react'

export type ExhangeData = {
  isLoading?: boolean
  dataExchange?: ExchangeType[]
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ExchangeDataContext = createContext<ExhangeData>({})
