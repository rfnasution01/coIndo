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
      {show && <span className="font-roboto text-[2.4rem]">Menu</span>}
      <span onClick={() => setShow(!show)}>
        <List />
      </span>
    </div>
  )
}
