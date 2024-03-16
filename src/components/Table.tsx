import { Fragment, useState } from 'react'
import clsx from 'clsx'

import { useSearch } from '@/lib/hooks/useSearch'
import { Loading } from './Loading'
import { ChevronDown } from 'lucide-react'

export type Column<T> = {
  header: string
  key?: string | number
  renderCell?: (rowData: T) => React.ReactNode
  width?: string
}

type Props<T, P> = {
  data: T[]
  columns: Column<T>[] | ((props: P) => Column<T>[])
  containerClasses?: string
  maxHeight?: string
  loading?: boolean
  columnProps?: P
  onItemClick?: (rowData: T) => void
  collapseComponent?: React.ReactNode
  checkbox?: boolean
  showCetak?: boolean
  isFarmasi?: boolean
  tableOne?: boolean
}

export function Table<T, P>({
  data,
  columns,
  containerClasses = '',
  maxHeight = 'max-h-[60vh]',
  loading,
  columnProps,
  onItemClick,
  collapseComponent,
  checkbox,
  showCetak,
  isFarmasi,
  tableOne,
}: Props<T, P>) {
  const [rowIsOpen, setRowIsOpen] = useState<number | null>(null)
  const { currentPage } = useSearch()

  const columnArray =
    typeof columns === 'function' ? columns(columnProps as P) : columns

  return (
    <div className={`rounded-2xl p-16 ${containerClasses}`}>
      {/* ----- Loading UI ----- */}
      {loading ? (
        <Loading width="6.4rem" height="6.4rem" />
      ) : (
        <div
          className={`scrollbar flex flex-col overflow-auto ${maxHeight}`}
          style={{ scrollbarGutter: 'stable' }}
        >
          {/* ----- No Data/Fallback UI ----- */}
          {!data || data.length === 0 ? (
            <p className="text-24 text-typography-disabled">No data.</p>
          ) : (
            <table className="flex-1 border-collapse text-24">
              <thead className="relative z-10 align-top leading-medium">
                <tr className="border-b-[1.6rem] border-transparent">
                  {/* ----- Header Checkbox ----- */}
                  {checkbox && (
                    <th className="sticky top-0 bg-white p-4 text-left">No</th>
                  )}

                  {/* ----- Table Headers ----- */}
                  {columnArray
                    .filter((column) => !column.header.includes('Aksi'))
                    .map((column, colIndex) => (
                      <th
                        className={`sticky top-0 bg-white p-4 text-left ${column.width}`}
                        key={column.key || colIndex.toString()}
                      >
                        {column.header.includes('Cetak')
                          ? showCetak
                            ? 'Cetak'
                            : ''
                          : column.header}
                      </th>
                    ))}

                  {isFarmasi &&
                    columnArray
                      .filter((column) => column.header.includes('Aksi'))
                      .map((column, colIndex) => (
                        <th
                          className={`sticky top-0 bg-white p-4 text-left ${column.width}`}
                          key={column.key || colIndex.toString()}
                        >
                          {column.header.includes('Cetak')
                            ? showCetak
                              ? 'Cetak'
                              : ''
                            : column.header}
                        </th>
                      ))}

                  {/* ----- Detail Header ----- */}
                  {collapseComponent && (
                    <th className="sticky right-0 top-0 bg-white p-16 text-left">
                      <span className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                        Detail
                      </span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <Fragment key={rowIndex}>
                    <tr
                      className={clsx(
                        'border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled',
                        {
                          'cursor-pointer': onItemClick,
                          'hover:bg-neutral-100':
                            onItemClick && !collapseComponent,
                        },
                      )}
                      onClick={onItemClick ? () => onItemClick(row) : undefined}
                    >
                      {/* ----- Body Checkbox ----- */}
                      {checkbox && (
                        <td className="p-4">
                          {tableOne && currentPage
                            ? currentPage - 1
                            : rowIndex + 6 === 10
                              ? ''
                              : currentPage - 1}
                          {tableOne ? rowIndex + 1 : rowIndex + 6}
                        </td>
                      )}

                      {/* ----- Table Data ----- */}
                      {columnArray
                        .filter((column) => !column.header.includes('Aksi'))
                        .map((column, colIndex) => (
                          <td
                            className={`p-4 leading-medium ${column.width}`}
                            key={column.key || colIndex.toString()}
                          >
                            {column.renderCell
                              ? column.renderCell(row)
                              : (row[
                                  column.key as keyof T
                                ] as React.ReactNode) || '-'}
                          </td>
                        ))}

                      {isFarmasi &&
                        columnArray
                          .filter((column) => column.header.includes('Aksi'))
                          .map((column, colIndex) => (
                            <td
                              className={`p-4 leading-medium ${column.width}`}
                              key={column.key || colIndex.toString()}
                            >
                              {column.renderCell
                                ? column.renderCell(row)
                                : (row[
                                    column.key as keyof T
                                  ] as React.ReactNode) || '-'}
                            </td>
                          ))}

                      {/* ----- Collapse Trigger ----- */}
                      {collapseComponent && (
                        <td className="sticky right-0 bg-white p-16">
                          <div className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                            <button
                              className="rounded-full p-4 transition-all ease-in hover:bg-neutral-100"
                              onClick={() => {
                                if (rowIsOpen === rowIndex) {
                                  setRowIsOpen(null)
                                } else {
                                  setRowIsOpen(rowIndex)
                                }
                              }}
                            >
                              <ChevronDown
                                width={20}
                                height={20}
                                className={clsx('transition-all ease-in', {
                                  'rotate-180': rowIsOpen === rowIndex,
                                  'rotate-0': rowIsOpen !== rowIndex,
                                })}
                              />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>

                    {/* ----- Collapse Content ----- */}
                    {collapseComponent && (
                      <tr>
                        <td colSpan={columnArray.length + (checkbox ? 2 : 1)}>
                          <div
                            className={clsx(
                              'overflow-hidden border-b bg-neutral-100 bg-opacity-[0.15] px-8 transition-all ease-in',
                              {
                                'max-h-full translate-y-0 py-16 opacity-100':
                                  rowIsOpen === rowIndex,
                                'max-h-0 -translate-y-16 opacity-0':
                                  rowIsOpen !== rowIndex,
                              },
                            )}
                          >
                            {collapseComponent}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}