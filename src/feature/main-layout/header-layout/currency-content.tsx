import { Dispatch, SetStateAction, useContext } from 'react'
import { CurrencyMapping } from './currency-mapping'
import { Input } from '@/components/Input'
import { Search } from 'lucide-react'
import { RatesDataContext } from '@/lib/context/ratesContext/ratesData'

export function CurrencyContent({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const ratesContext = useContext(RatesDataContext)

  return (
    <div className="flex flex-col gap-y-32">
      <Input
        placeholder="USD / United States Dollar / $"
        suffix={<Search size={18} />}
        onChange={ratesContext.onSearch}
      />
      <div className="scrollbar max-h-[50vh] overflow-y-auto phones:max-h-[85vh]">
        <div className="flex flex-col gap-y-24">
          {/* --- Crypto --- */}
          <CurrencyMapping
            title="Crypto Currency"
            rates={ratesContext.ratesCrypto}
            setIsOpen={setIsOpen}
            isLoading={ratesContext.isLoading}
          />
          {/* --- Fiat --- */}
          <CurrencyMapping
            title="Fiat Currency"
            rates={ratesContext.ratesFiat}
            setIsOpen={setIsOpen}
            isLoading={ratesContext.isLoading}
          />
        </div>
      </div>
    </div>
  )
}
