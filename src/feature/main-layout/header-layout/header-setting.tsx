import { DialogComponent } from '@/components/ui/dialog'
import {
  Calculator,
  ChevronDown,
  Globe,
  Moon,
  Settings,
  SunMoon,
} from 'lucide-react'
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
      <div className="flex items-center gap-x-48 text-[2rem]">
        {/* --- Currency ---  */}
        <div
          onClick={() => setIsOpenCurrency(true)}
          className="flex items-center gap-x-4 hover:cursor-pointer hover:text-slate-400 phones:hidden"
        >
          <h5>{stateCurrency.symbol ?? '-'}</h5>
          <ChevronDown size={20} />
        </div>

        {/* --- Language ---  */}
        <div className="flex items-center gap-x-8 hover:cursor-pointer hover:text-slate-400 phones:hidden">
          <h5>Id</h5>
          <Globe size={20} />
        </div>

        {/* --- Calculator ---  */}
        <span
          onClick={() => setIsOpenCalculator(true)}
          className="hover:cursor-pointer hover:text-slate-400 phones:hidden"
        >
          <Calculator size={20} />
        </span>

        {/* --- Mode --- */}
        <span
          onClick={() => setIsLight(!isLight)}
          className="hover:cursor-pointer hover:text-slate-400 phones:hidden"
        >
          {isLight ? <Moon size={20} /> : <SunMoon size={20} />}
        </span>

        {/* --- Setting --- */}
        <span
          onClick={() => setIsLight(!isLight)}
          className="hover:cursor-pointer hover:text-slate-400 phones:hidden"
        >
          <Settings size={20} />
        </span>
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
