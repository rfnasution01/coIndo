import { RatesType } from '@/lib/interfaces/ratesProps'
import { useGetRatesQuery } from '@/store/slices/ratesAPI'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CurrencyMapping } from './currency-mapping'

export function CurrencyContent({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [search, _setSearch] = useState<string | undefined>(undefined)
  const { data, isLoading } = useGetRatesQuery({ search })
  const [ratesCrypto, setRatesCrypto] = useState<RatesType[]>([])
  const [ratesFiat, setRatesFiat] = useState<RatesType[]>([])

  useEffect(() => {
    if (data?.data) {
      setRatesFiat(data?.data?.filter((item) => item.type.includes('fiat')))
      setRatesCrypto(data?.data?.filter((item) => item.type.includes('crypto')))
    }
  }, [data?.data])

  return (
    <div className="flex flex-col gap-y-32">
      <div className="bg-slate-200 p-16 ">Search</div>
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
