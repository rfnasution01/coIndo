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
      className={clsx(
        'scrollbar relative flex max-h-screen min-h-screen max-w-full flex-col overflow-x-auto overflow-y-auto',
        {
          'bg-light-background text-black': mode.isLight,
          'bg-dark-background text-white': !mode?.isLight,
        },
      )}
    >
      <header className="hidden phones:block">
        <MobileHeader
          isOpenCalculator={isOpenCalculator}
          setIsOpenCalculator={setIsOpenCalculator}
          isOpenCurrency={isOpenCurrency}
          setIsOpenCurrency={setIsOpenCurrency}
        />
      </header>
      <div className="flex flex-1 flex-row">
        <aside
          className={clsx(
            'sticky left-0 top-0 flex max-h-screen flex-col gap-y-64 p-32 text-white shadow phones:hidden',
            { 'bg-dark-tint-2': mode.isLight, 'bg-dark-tint-1': !mode.isLight },
          )}
        >
          <AsideHeader show={show} setShow={setShow} />
          <AsideNavigation show={show} />

          <AsideWallet show={show} />
        </aside>
        <article className="flex flex-1 flex-col gap-y-32">
          <div
            className={clsx(
              'flex flex-row items-center justify-between px-48 py-16 shadow-md phones:hidden',
              {
                'bg-white': mode.isLight,
                'bg-dark-tint-2': !mode?.isLight,
              },
            )}
          >
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
