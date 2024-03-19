import { DialogComponent } from '@/components/ui/dialog'
import { ListNavigationMain } from '@/lib/consts/dummy/ListNavigationMain'
import { usePathname } from '@/lib/hooks/usePathname'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'
import clsx from 'clsx'
import { Calculator, ChevronDown, Moon, SunMoon } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CurrencyContent } from './currency-content'

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
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
        <div className="flex w-full items-center gap-x-32">
          <div
            className="flex h-64 flex-1 items-center justify-center border-2 border-black text-[2rem]"
            onClick={() => setIsOpen(true)}
          >
            <h5>{stateCurrency.symbol ?? '-'}</h5>
            <ChevronDown />
          </div>
          <div className="flex h-64 flex-1 items-center justify-center border-2 border-black text-[2rem]">
            <Calculator size={18} />
          </div>
          <div
            className="flex h-64 flex-1 items-center justify-center border-2 border-black text-[2rem]"
            onClick={() => setIsLight(!isLight)}
          >
            {isLight ? <Moon size={18} /> : <SunMoon size={18} />}
          </div>
        </div>
      </div>
      <DialogComponent
        title="Pilih Currency"
        open={isOpen}
        setOpen={setIsOpen}
        customComponent={<CurrencyContent setIsOpen={setIsOpen} />}
      />
    </>
  )
}
