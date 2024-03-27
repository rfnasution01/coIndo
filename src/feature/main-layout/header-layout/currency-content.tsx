import { Dispatch, SetStateAction, useContext } from 'react'
import { CurrencyMapping } from './currency-mapping'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { RatesDataContext } from '@/lib/context/ratesContext/ratesData'
import { useSelector } from 'react-redux'
import { getModeSlice } from '@/store/reducer/stateMode'
import clsx from 'clsx'

export function CurrencyContent({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const ratesContext = useContext(RatesDataContext)
  const mode = useSelector(getModeSlice)

  return (
    <div className="flex flex-col gap-y-32">
      <Input
        className={clsx('border', {
          'border-slate-300 bg-white': mode.isLight,
          'bg-dark-tint-1 border-zinc-800': !mode.isLight,
        })}
        placeholder="USD / United States Dollar / $"
        prefix={<Search size={18} />}
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
