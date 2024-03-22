import { ListNavigationMain } from '@/lib/consts/dummy/ListNavigationMain'
import { usePathname } from '@/lib/hooks/usePathname'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'
import clsx from 'clsx'
import { Calculator, ChevronDown, Moon, Settings, SunMoon } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CurrencyContent } from './currency-content'
import { DialogHelpers } from '@/components/ui/dialog'
import { CalculatorContent } from './calculator-content'

export function MobileNavigation({
  setIsLight,
  isLight,
  setIsOpenNav,
}: {
  isLight: boolean
  setIsLight: Dispatch<SetStateAction<boolean>>
  setIsOpenNav: Dispatch<SetStateAction<boolean>>
}) {
  const { firstPathname } = usePathname()
  const stateCurrency = useSelector(getCurrencySlice)
  const [isOpenCurrency, setIsOpenCurrency] = useState<boolean>(false)
  const [isOpenCalculator, setIsOpenCalculator] = useState<boolean>(false)

  const isPathnameOpen = (name: string) => {
    return (
      (name === 'Homepage' && firstPathname === '') ||
      firstPathname === name.toLowerCase()
    )
  }
  return (
    <>
      <div className="mt-48 flex flex-col gap-y-32">
        {ListNavigationMain?.map((item, idx) => (
          <Link
            to={item?.url}
            className={clsx('flex flex-row gap-x-24 p-16', {
              'text-primary': isPathnameOpen(item?.name),
              'text-black': !isPathnameOpen(item?.name),
            })}
            onClick={() => setIsOpenNav(false)}
            key={idx}
          >
            <span>{item?.icon}</span>
            <span className="text-[3rem]">{item?.name}</span>
          </Link>
        ))}
        <div className="flex w-full flex-wrap items-center justify-center gap-32">
          <div
            className="flex h-64 w-3/12 items-center justify-center border-2 border-black text-[2rem]"
            onClick={() => setIsOpenCurrency(true)}
          >
            <h5>{stateCurrency.symbol ?? '-'}</h5>
            <ChevronDown size={18} />
          </div>
          <div
            onClick={() => setIsOpenCalculator(true)}
            className="flex h-64 w-3/12 items-center justify-center border-2 border-black text-[2rem]"
          >
            <Calculator size={18} />
          </div>
          <div className="flex h-64 w-3/12 items-center justify-center border-2 border-black text-[2rem]">
            <Settings size={18} />
          </div>
          {/* --- Language ---  */}
          <div className="flex h-64 w-3/12 items-center justify-center gap-x-4 border-2 border-black text-[2rem]">
            <h5>ID</h5>
            <ChevronDown size={18} />
          </div>
          <div
            className="flex h-64 w-3/12 items-center justify-center border-2 border-black text-[2rem]"
            onClick={() => setIsLight(!isLight)}
          >
            {isLight ? <Moon size={18} /> : <SunMoon size={18} />}
          </div>
        </div>
      </div>
      <DialogHelpers
        title="Pilih Currency"
        open={isOpenCurrency}
        setOpen={setIsOpenCurrency}
        customComponent={<CurrencyContent setIsOpen={setIsOpenCurrency} />}
      />
      <DialogHelpers
        title="Konversi Currency"
        open={isOpenCalculator}
        setOpen={setIsOpenCalculator}
        customComponent={<CalculatorContent />}
      />
    </>
  )
}
