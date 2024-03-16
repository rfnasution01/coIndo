import clsx from 'clsx'
import { List } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function AsideHeader({
  show,
  setShow,
}: {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div
      className={clsx('flex transition-all duration-300 hover:cursor-pointer', {
        'flex-row items-center justify-between gap-x-32': show,
        'flex-col-reverse items-center gap-y-16': !show,
      })}
    >
      <div className="flex items-center gap-x-8 font-roboto text-[3rem] text-primary">
        <img src="/img/logo.png" alt="CoIndoe" width={36} height={36} />
        {show && <h5>CoIndo</h5>}
      </div>
      <span className="text-primary" onClick={() => setShow(!show)}>
        <List />
      </span>
    </div>
  )
}
