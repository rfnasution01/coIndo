import { DialogComponent } from '@/components/ui/dialog'
import { Calculator, ChevronDown, Moon, SunMoon } from 'lucide-react'
import { useState } from 'react'
import { CurrencyContent } from './currency-content'
import { useSelector } from 'react-redux'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'
import { CalculatorContent } from './calculator-content'

export function HeaderSetting() {
  const [isOpenCurrency, setIsOpenCurrency] = useState<boolean>(false)
  const [isOpenCalculator, setIsOpenCalculator] = useState<boolean>(false)
  const [isLight, setIsLight] = useState<boolean>(true)
  const stateCurrency = useSelector(getCurrencySlice)

  return (
    <>
      <div className="flex items-center gap-x-48">
        <div
          onClick={() => setIsOpenCurrency(true)}
          className="flex items-center gap-x-8 font-roboto text-[2.4rem] text-black hover:cursor-pointer hover:text-primary-shade-1 phones:hidden"
        >
          <h5>{stateCurrency.symbol ?? '-'}</h5>
          <ChevronDown />
        </div>
        <div
          onClick={() => setIsOpenCalculator(true)}
          className="flex items-center gap-x-8 font-roboto text-[2.4rem] text-black hover:cursor-pointer hover:text-primary-shade-1 phones:hidden"
        >
          <Calculator size={18} />
        </div>
        <div
          onClick={() => setIsLight(!isLight)}
          className="flex items-center gap-x-8 font-roboto text-[2.4rem] text-black hover:cursor-pointer hover:text-primary-shade-1 phones:hidden"
        >
          {isLight ? <Moon size={18} /> : <SunMoon size={18} />}
        </div>
      </div>
      <DialogComponent
        title="Pilih Currency"
        open={isOpenCurrency}
        setOpen={setIsOpenCurrency}
        customComponent={<CurrencyContent setIsOpen={setIsOpenCurrency} />}
      />
      <DialogComponent
        title="Konversi Currency"
        open={isOpenCalculator}
        setOpen={setIsOpenCalculator}
        customComponent={<CalculatorContent />}
        size="small"
      />
    </>
  )
}
