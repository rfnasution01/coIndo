import { ListNavigationMain } from '@/lib/consts/dummy/ListNavigationMain'
import { usePathname } from '@/lib/hooks/usePathname'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export function AsideNavigation({ show }: { show: boolean }) {
  const { firstPathname } = usePathname()

  const isPathnameOpen = (name: string) => {
    return (
      (name === 'Homepage' && firstPathname === '') ||
      firstPathname === name.toLowerCase()
    )
  }

  return (
    <div
      className={clsx('flex flex-1 flex-col gap-y-24', {
        'items-center': !show,
        'items-start': show,
      })}
    >
      {ListNavigationMain.map((item, idx) => (
        <Link
          to={item?.url}
          className={clsx(
            'flex items-center gap-x-16 rounded-lg border-l-2 px-8 py-12 hover:border-primary hover:bg-primary-tint-1 hover:text-primary',
            {
              'border-primary bg-primary-tint-1 text-primary': isPathnameOpen(
                item?.name,
              ),
              'border-transparent': !isPathnameOpen(item?.name),
            },
            {
              'min-w-[25rem]': show,
              'w-auto': !show,
            },
          )}
          key={idx}
        >
          <span className="">{item?.icon}</span>
          {show && <h5 className="font-roboto text-[2rem]">{item?.name}</h5>}
        </Link>
      ))}
    </div>
  )
}
