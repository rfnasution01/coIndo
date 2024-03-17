import { RatesType } from '@/lib/interfaces/ratesProps'
import { useGetRatesQuery } from '@/store/slices/ratesAPI'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CurrencyMapping } from './currency-mapping'
import { Input } from '@/components/Input'
import { Search } from 'lucide-react'
import { debounce } from 'lodash'
import { convertSlugToText } from '@/lib/helpers/formatText'

export function CurrencyContent({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [search, setSearch] = useState<string>('')
  const { data, isLoading } = useGetRatesQuery()
  const [ratesCrypto, setRatesCrypto] = useState<RatesType[]>([])
  const [ratesFiat, setRatesFiat] = useState<RatesType[]>([])

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
    }
  }, [data?.data, search])

  const handleSearch = debounce((searchValue: string) => {
    setSearch(searchValue)
  }, 300)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  return (
    <div className="flex flex-col gap-y-32">
      <Input
        placeholder="USD / United States Dollar / $"
        suffix={<Search size={18} />}
        onChange={onSearch}
      />
      <div className="scrollbar max-h-[50vh] overflow-y-auto">
        <div className="flex flex-col gap-y-24">
          {/* --- Crypto --- */}
          <CurrencyMapping
            title="Crypto Currency"
            rates={ratesCrypto}
            setIsOpen={setIsOpen}
            isLoading={isLoading}
          />
          {/* --- Fiat --- */}
          <CurrencyMapping
            title="Fiat Currency"
            rates={ratesFiat}
            setIsOpen={setIsOpen}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
