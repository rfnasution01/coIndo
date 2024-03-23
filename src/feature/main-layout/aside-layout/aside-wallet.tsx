import { Button } from '@/components/Button'
import { Wallet } from 'lucide-react'

export function AsideWallet({ show }: { show: boolean }) {
  return (
    <Button variant="light" disabled>
      <div className={'flex items-center gap-x-8'}>
        <span>
          <Wallet size={18} />
        </span>
        {show && <h5 className="font-sf-pro text-[2rem]">Wallet</h5>}
      </div>
    </Button>
  )
}
