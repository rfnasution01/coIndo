import { ListNavigationMain } from '@/lib/consts/dummy/ListNavigationMain'
import { usePathname } from '@/lib/hooks/usePathname'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

export function MobileNavigation({
  setIsOpen,
}: {
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
    <div className="mt-48 flex flex-col gap-y-32">
      {ListNavigationMain?.map((item, idx) => (
        <Link
          to={item?.url}
          className={clsx('flex flex-row gap-x-24 p-16', {
            'text-primary': isPathnameOpen(item?.name),
            'text-black': !isPathnameOpen(item?.name),
          })}
          onClick={() => setIsOpen(false)}
          key={idx}
        >
          <span>{item?.icon}</span>
          <span className="text-[3rem]">{item?.name}</span>
        </Link>
      ))}
    </div>
  )
}
