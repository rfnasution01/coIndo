import { ListNavigationMain } from '@/lib/consts/dummy/ListNavigationMain'
import { usePathname } from '@/lib/hooks/usePathname'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { CurrencyContent } from './currency-content'
import { DialogHelpers } from '@/components/ui/dialog'
import { CalculatorContent } from './calculator-content'
import { AsideWallet, OptionalNavigation } from '..'

export function MobileNavigation({
  setIsOpenNav,
  isOpenCalculator,
  isOpenCurrency,
  setIsOpenCalculator,
  setIsOpenCurrency,
  setIsOpen,
}: {
  setIsOpenNav: Dispatch<SetStateAction<boolean>>
  isOpenCurrency: boolean
  setIsOpenCurrency: Dispatch<SetStateAction<boolean>>
  isOpenCalculator: boolean
  setIsOpenCalculator: Dispatch<SetStateAction<boolean>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { firstPathname } = usePathname()

  const isPathnameOpen = (name: string) => {
    return (
      (name === 'Homepage' && firstPathname === '') ||
      firstPathname === name.toLowerCase()
    )
  }
  return (
    <>
      <div className="mt-48 flex flex-col gap-y-32 ">
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
        <OptionalNavigation
          isOpenCalculator={isOpenCalculator}
          setIsOpenCalculator={setIsOpenCalculator}
          isOpenCurrency={isOpenCurrency}
          setIsOpenCurrency={setIsOpenCurrency}
          setIsOpen={setIsOpen}
        />
        <AsideWallet show={false} />
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
