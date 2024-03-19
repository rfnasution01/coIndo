import { FormLabel } from '@/components/ui/input'
import ListCurrency from '@/components/ui/select/listCurrency'
import { RatesDataContext } from '@/lib/context/ratesContext/ratesData'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'

export function CalculatorContent() {
  const stateCurrency = useSelector(getCurrencySlice)
  const [jumlah, setJumlah] = useState<number | undefined>(0)
  const [_value, setValue] = useState<number | undefined>(0)
  const ratesContext = useContext(RatesDataContext)

  return (
    <div className="gap-y- flex flex-col gap-y-32">
      <FormLabel label="Jumlah" type="number" setNumberValue={setJumlah} />
      <div className="">
        <ListCurrency
          isDisabled={ratesContext?.isLoading}
          isLoading={ratesContext?.isLoading}
          data={ratesContext?.ratesFiat ?? []}
          setValue={setValue}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-24 bg-background p-24">
        <h3 className="font-roboto text-[3rem] font-bold">
          {jumlah ?? 0} {stateCurrency?.symbol}
        </h3>
        <h5 className="text-[2rem]">1 BTC = 64.440 USD</h5>
      </div>
    </div>
  )
}
