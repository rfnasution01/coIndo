import { useNavigate, useSearchParams } from 'react-router-dom'
import { AssetsType } from '../interfaces/assetProps'

export function useSearch() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' })

  const currentPage = parseInt(searchParams.get('page') as string) || 1
  const id = searchParams.get('id') || undefined

  const clickHandler = (pageNumber: number) => {
    setSearchParams((prev) => {
      const id = prev.get('id') || null

      return {
        page: pageNumber.toString(),
        ...(id !== null ? { id } : {}),
      }
    })
  }

  const clickHandlerId = (rowData: AssetsType) => {
    navigate(`detail?id=${rowData?.id}`)
  }

  return {
    searchParams,
    setSearchParams,
    currentPage,
    onPageChange: clickHandler,
    onIdChange: clickHandlerId,
    id,
  }
}
