import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useGetExchangesQuery } from '@/store/slices/exchangesAPI'
import { ExchangeType } from '@/lib/interfaces/exchangesProps'
import { ExchangeDataContext } from './exchangeData'

const ExchangeDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState<string>('')
  const { data, isLoading } = useGetExchangesQuery()
  const [dataExchange, setDataExchange] = useState<ExchangeType[]>([])

  useEffect(() => {
    if (data?.data) {
      setDataExchange(data?.data)
    }
  }, [data?.data, search])

  const handleSearch = debounce((searchValue: string) => {
    setSearch(searchValue)
  }, 300)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  const value = {
    dataExchange,
    isLoading,
    onSearch,
  }

  return (
    <ExchangeDataContext.Provider value={value}>
      {children}
    </ExchangeDataContext.Provider>
  )
}

export default ExchangeDataProvider
