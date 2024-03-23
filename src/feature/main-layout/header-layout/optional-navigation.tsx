import { Calculator, ChevronDown, Moon, Settings, SunMoon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { CurrencyContent } from './currency-content'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'
import { CalculatorContent } from './calculator-content'
import { DialogHelpers } from '@/components/ui/dialog'
import {
  StateModeType,
  getModeSlice,
  setStateMode,
} from '@/store/reducer/stateMode'

export function OptionalNavigation({
  isOpenCalculator,
  isOpenCurrency,
  setIsOpenCalculator,
  setIsOpenCurrency,
  setIsOpen,
}: {
  isOpenCurrency: boolean
  setIsOpenCurrency: Dispatch<SetStateAction<boolean>>
  isOpenCalculator: boolean
  setIsOpenCalculator: Dispatch<SetStateAction<boolean>>
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}) {
  const dispatch = useDispatch()
  const stateCurrency = useSelector(getCurrencySlice)
  const mode = useSelector(getModeSlice)

  const handleChangeMODE = (isLight: boolean) => {
    const newMode: StateModeType = {
      isLight: !isLight,
    }
    dispatch(setStateMode(newMode))
    if (setIsOpen) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-end gap-32 phones:justify-center">
        {/* Currency  */}
        <div
          className="flex h-64 items-center justify-center text-[2rem] hover:cursor-pointer hover:text-slate-400 phones:w-3/12 phones:border-2 phones:border-black"
          onClick={() => setIsOpenCurrency(true)}
        >
          <h5>{stateCurrency.symbol ?? '-'}</h5>
          <ChevronDown size={18} />
        </div>
        {/* --- Language ---  */}
        <div className="flex h-64 items-center justify-center gap-x-4 text-[2rem] phones:w-3/12 phones:border-2 phones:border-black">
          <h5>ID</h5>
          <ChevronDown size={18} />
        </div>
        {/* Calculator  */}
        <div
          onClick={() => setIsOpenCalculator(true)}
          className="flex h-64 items-center justify-center text-[2rem] hover:cursor-pointer hover:text-slate-400 phones:w-3/12 phones:border-2 phones:border-black"
        >
          <Calculator size={18} />
        </div>
        {/* Mode  */}
        <div
          className="flex h-64 items-center justify-center text-[2rem] hover:cursor-pointer hover:text-slate-400 phones:w-3/12 phones:border-2 phones:border-black"
          onClick={() => handleChangeMODE(mode?.isLight)}
        >
          {mode?.isLight ? <Moon size={18} /> : <SunMoon size={18} />}
        </div>
        {/* Setting  */}
        <div className="flex h-64 items-center justify-center text-[2rem] phones:w-3/12 phones:border-2 phones:border-black">
          <Settings size={18} />
        </div>
      </div>
      <DialogHelpers
        title="Pilih Currency"
        open={isOpenCurrency}
        setOpen={setIsOpenCurrency}
        customComponent={<CurrencyContent setIsOpen={setIsOpenCurrency} />}
      />
      <div className="phones:hidden">
        <DialogHelpers
          title="Konversi Currency"
          open={isOpenCalculator}
          setOpen={setIsOpenCalculator}
          customComponent={<CalculatorContent />}
          size="medium"
        />
      </div>
      <div className="hidden phones:block">
        <DialogHelpers
          title="Konversi Currency"
          open={isOpenCalculator}
          setOpen={setIsOpenCalculator}
          customComponent={<CalculatorContent />}
        />
      </div>
    </>
  )
}
