import { useLocation } from 'react-router-dom'


export const useTimeflowUrl = () => {
  const { pathname } = useLocation()

  const splittedPath = pathname.split('/')
  const firstPathname = splittedPath.at(1)
  const secondPathname = splittedPath.at(2)
  const lastPathname = splittedPath.at(-1)


  return {
    pathname,
    splittedPath,
    firstPathname,
    secondPathname,
    lastPathname,
  }
}
