import { Link } from 'react-router-dom'

export function HeaderInfo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-x-8 font-roboto text-[2.4rem]"
    >
      <img src="/img/logo.png" alt="CoIndo" width={36} height={36} />
      <h5>CoIndo</h5>
    </Link>
  )
}
