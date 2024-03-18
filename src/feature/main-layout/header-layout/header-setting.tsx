import { DialogComponent } from '@/components/ui/dialog'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { CurrencyContent } from './currency-content'
import { useSelector } from 'react-redux'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'

export function HeaderSetting() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const stateCurrency = useSelector(getCurrencySlice)

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-x-8 font-roboto text-[2.4rem] text-black hover:cursor-pointer hover:text-primary-shade-1"
      >
        <h5>{stateCurrency.symbol ?? '-'}</h5>
        <ChevronDown />
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
