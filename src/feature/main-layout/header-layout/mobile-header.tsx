import { List } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Dispatch, SetStateAction, useState } from 'react'
import { MobileNavigation } from './mobile-navigation'
import { DialogHelpers } from '@/components/ui/dialog'
import { useSelector } from 'react-redux'
import { getModeSlice } from '@/store/reducer/stateMode'
import clsx from 'clsx'

export function MobileHeader({
  isOpenCalculator,
  isOpenCurrency,
  setIsOpenCalculator,
  setIsOpenCurrency,
}: {
  isOpenCurrency: boolean
  setIsOpenCurrency: Dispatch<SetStateAction<boolean>>
  isOpenCalculator: boolean
  setIsOpenCalculator: Dispatch<SetStateAction<boolean>>
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const mode = useSelector(getModeSlice)

  return (
    <>
      <div
        className={clsx(
          'flex items-center justify-between gap-x-16 px-48 py-32 shadow-lg',
          {
            'bg-white': mode.isLight,
            'bg-dark-tint-2': !mode?.isLight,
          },
        )}
      >
        <span onClick={() => setIsOpen(true)}>
          <List />
        </span>
        <div className="flex items-center gap-x-48">
          <Link to="/" className="flex items-center gap-x-16">
            <img src="img/logo.png" alt="Coindo" width={48} height={48} />
          </Link>
        </div>
      </div>
      <DialogHelpers
        title={
          <div className="flex items-center gap-x-24 px-16 py-24 shadow-md">
            <img src="/img/logo.png" alt="CoIndo" width={48} height={48} />
            <h5 className="font-roboto text-[3rem]">CoIndo</h5>
          </div>
        }
        open={isOpen}
        setOpen={setIsOpen}
        noPadding
        customComponent={
          <MobileNavigation
            setIsOpenNav={setIsOpen}
            isOpenCalculator={isOpenCalculator}
            setIsOpenCalculator={setIsOpenCalculator}
            isOpenCurrency={isOpenCurrency}
            setIsOpenCurrency={setIsOpenCurrency}
            setIsOpen={setIsOpen}
          />
        }
      />
    </>
  )
}
