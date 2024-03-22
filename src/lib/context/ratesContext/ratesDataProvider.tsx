import { useEffect, useState } from 'react'
import { RatesDataContext } from './ratesData'
import { useGetRatesQuery } from '@/store/slices/ratesAPI'
import { convertSlugToText } from '@/lib/helpers/formatText'
import { debounce } from 'lodash'
import { RatesType } from '@/lib/interfaces/ratesProps'

const RatesDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState<string>('')
  const { data, isLoading } = useGetRatesQuery()
  const [ratesCrypto, setRatesCrypto] = useState<RatesType[]>([])
  const [ratesFiat, setRatesFiat] = useState<RatesType[]>([])
  const [ratesAll, setRatesAll] = useState<RatesType[]>([])

  useEffect(() => {
    if (data?.data) {
      const filteredCrypto = data?.data.filter(
        (item) =>
          item.type === 'crypto' &&
          (item?.currencySymbol?.toLowerCase().includes(search.toLowerCase()) ||
            convertSlugToText(item?.id)
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item?.symbol?.toLowerCase().includes(search.toLowerCase())),
      )
      const filteredFiat = data?.data.filter(
        (item) =>
          item.type === 'fiat' &&
          (item?.currencySymbol?.toLowerCase().includes(search.toLowerCase()) ||
            convertSlugToText(item?.id)
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            item?.symbol?.toLowerCase().includes(search.toLowerCase())),
      )

      setRatesCrypto(filteredCrypto)
      setRatesFiat(filteredFiat)
      setRatesAll(data?.data)
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
    isLoading,
    ratesCrypto,
    ratesFiat,
    onSearch,
    ratesAll,
  }

  return (
    <RatesDataContext.Provider value={value}>
      {children}
    </RatesDataContext.Provider>
  )
}

export default RatesDataProvider
