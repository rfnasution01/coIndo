import { useState } from 'react'
import {
  AsideHeader,
  AsideNavigation,
  AsideWallet,
} from './components/main-layout'

function App() {
  const [show, setShow] = useState<boolean>(true)

  return (
    <section
      id="RootLayout"
      className="bg-backgrounds relative flex min-h-screen flex-row"
    >
      <aside className="flex flex-col gap-y-32 bg-white px-32 py-64 shadow">
        <AsideHeader show={show} setShow={setShow} />
        <AsideNavigation show={show} />
        <AsideWallet show={show} />
      </aside>
      <div className="flex-1 ">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
        nesciunt obcaecati quis voluptatibus autem necessitatibus quidem
        deleniti laborum fugit molestias. Tenetur, labore eos earum optio
        eveniet consectetur minus magnam ea?
      </div>
    </section>
  )
}

export default App
