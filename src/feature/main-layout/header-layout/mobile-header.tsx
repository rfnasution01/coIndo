import { List } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AsideWallet, HeaderSetting } from '..'
import { DialogComponent } from '@/components/ui/dialog'
import { Dispatch, SetStateAction, useState } from 'react'
import { MobileNavigation } from './mobile-navigation'

export function MobileHeader({
  isLight,
  setIsLight,
}: {
  isLight: boolean
  setIsLight: Dispatch<SetStateAction<boolean>>
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <div className="flex items-center justify-between gap-x-16 bg-white px-48 py-32 shadow-lg">
        <span onClick={() => setIsOpen(true)}>
          <List />
        </span>
        <div className="flex items-center gap-x-48">
          <HeaderSetting />
          <AsideWallet show={false} />
          <Link to="/" className="flex items-center gap-x-16">
            <img src="img/logo.png" alt="Coindo" width={48} height={48} />
          </Link>
        </div>
      </div>
      <DialogComponent
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
            setIsLight={setIsLight}
            isLight={isLight}
            setIsOpenNav={setIsOpen}
          />
        }
      />
    </>
  )
}
