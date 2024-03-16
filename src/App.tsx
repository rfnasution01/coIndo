import { useState } from 'react'
import {
  AsideHeader,
  AsideNavigation,
  AsideWallet,
  HeaderBreadCrumb,
  HeaderSetting,
} from './components/main-layout'
import { Outlet } from 'react-router-dom'

function App() {
  const [show, setShow] = useState<boolean>(true)

  return (
    <section
      id="RootLayout"
      className="bg-backgrounds relative flex min-h-screen flex-row"
    >
      <aside className="flex flex-col gap-y-64 bg-white px-32 py-64 shadow">
        <AsideHeader show={show} setShow={setShow} />
        <AsideNavigation show={show} />
        <AsideWallet show={show} />
      </aside>
      <div className="flex flex-1 flex-col gap-y-32 px-32 py-64">
        <header className="flex items-center justify-between">
          <HeaderBreadCrumb />
          <HeaderSetting />
        </header>
        <article className="flex-1 bg-red-300">
          <Outlet />
        </article>
      </div>
    </section>
  )
}

export default App
