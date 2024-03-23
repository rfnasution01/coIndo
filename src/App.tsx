import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
  AsideHeader,
  AsideNavigation,
  AsideWallet,
  OptionalNavigation,
} from './feature/main-layout'
import { MobileHeader } from './feature/main-layout/header-layout/mobile-header'
import { Breadcrumb } from './components/Breadcrumb'
import { useSelector } from 'react-redux'
import { getModeSlice } from './store/reducer/stateMode'
import clsx from 'clsx'

function App() {
  const [show, setShow] = useState<boolean>(true)
  const [isOpenCurrency, setIsOpenCurrency] = useState<boolean>(false)
  const [isOpenCalculator, setIsOpenCalculator] = useState<boolean>(false)
  const mode = useSelector(getModeSlice)

  return (
    <section
      id="RootLayout"
      className={clsx('relative flex min-h-screen flex-col', {
        'bg-light-background text-black': mode.isLight,
        'bg-dark-background text-white': !mode?.isLight,
      })}
    >
      <header className="hidden phones:block">
        <MobileHeader
          isOpenCalculator={isOpenCalculator}
          setIsOpenCalculator={setIsOpenCalculator}
          isOpenCurrency={isOpenCurrency}
          setIsOpenCurrency={setIsOpenCurrency}
        />
      </header>
      <div className="flex h-full flex-1 flex-row">
        <aside
          className={clsx(
            'flex flex-col gap-y-64 bg-primary-shade-2 p-32 text-white shadow phones:hidden',
            {
              'bg-zinc-800': mode.isLight,
              'bg-zinc-950': !mode?.isLight,
            },
          )}
        >
          <AsideHeader show={show} setShow={setShow} />
          <AsideNavigation show={show} />

          <AsideWallet show={show} />
        </aside>
        <article className="flex flex-1 flex-col gap-y-32 px-48 py-32">
          <div className="flex flex-row items-center justify-between phones:hidden">
            <Breadcrumb />
            <OptionalNavigation
              isOpenCalculator={isOpenCalculator}
              setIsOpenCalculator={setIsOpenCalculator}
              isOpenCurrency={isOpenCurrency}
              setIsOpenCurrency={setIsOpenCurrency}
            />
          </div>
          <Outlet />
        </article>
      </div>
    </section>
  )
}

export default App
