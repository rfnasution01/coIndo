import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
  AsideHeader,
  AsideNavigation,
  AsideWallet,
  HeaderSetting,
} from './feature/main-layout'
import { MobileHeader } from './feature/main-layout/header-layout/mobile-header'
import { HeaderInfo } from './feature/main-layout/header-layout/header-info'

function App() {
  const [show, setShow] = useState<boolean>(true)
  const [isLight, setIsLight] = useState<boolean>(true)

  return (
    <section
      id="RootLayout"
      className="bg-backgrounds relative flex min-h-screen flex-col"
    >
      <header className="flex items-center justify-between gap-y-32 bg-transparent px-32 py-24 shadow-md phones:hidden">
        <HeaderInfo />
        <HeaderSetting />
      </header>
      <header className="hidden phones:block">
        <MobileHeader setIsLight={setIsLight} isLight={isLight} />
      </header>
      <div className="flex h-full flex-1 flex-row">
        <aside className="flex flex-col gap-y-64 bg-white p-32 shadow phones:hidden">
          <AsideHeader show={show} setShow={setShow} />
          <AsideNavigation show={show} />
          <AsideWallet show={show} />
        </aside>
        <article className="flex-1 gap-y-32 px-48 py-32">
          <Outlet />
        </article>
      </div>
    </section>
  )
}

export default App
