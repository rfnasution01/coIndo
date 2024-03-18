import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Breadcrumb } from './components/Breadcrumb'
import {
  AsideHeader,
  AsideNavigation,
  AsideWallet,
  HeaderSetting,
} from './feature/main-layout'
import { MobileHeader } from './feature/main-layout/header-layout/mobile-header'
import clsx from 'clsx'

function App() {
  const [show, setShow] = useState<boolean>(true)

  return (
    <section
      id="RootLayout"
      className="bg-backgrounds relative flex min-h-screen flex-row"
    >
      <aside className="flex flex-col gap-y-64 bg-white px-32 py-48 shadow phones:hidden">
        <AsideHeader show={show} setShow={setShow} />
        <AsideNavigation show={show} />
        <AsideWallet show={show} />
      </aside>
      <div className="flex flex-1 flex-col">
        <header
          className={clsx(
            'flex items-center justify-between gap-y-32 px-48 pb-16 phones:hidden',
            { 'pt-64': show, 'pt-48': !show },
          )}
        >
          <Breadcrumb />
          <HeaderSetting />
        </header>
        <header className="hidden phones:block">
          <MobileHeader />
        </header>
        <article className="flex-1 gap-y-32 px-48 phones:py-32">
          <Outlet />
        </article>
      </div>
    </section>
  )
}

export default App
