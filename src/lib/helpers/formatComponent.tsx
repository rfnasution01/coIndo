import { CSSProperties } from 'react'

interface FormatManipulationComponentProps {
  currencySymbol: string | undefined
  style?: CSSProperties
  className?: string
  isReverse?: boolean
  price: number
}

export function FormatManipulationComponent({
  currencySymbol,
  style,
  className,
  isReverse,
  price,
}: FormatManipulationComponentProps) {
  const splitPrice = price?.toString().split('.')

  return (
    <h5 className={`whitespace-nowrap ${className}`} style={{ ...style }}>
      {isReverse ? (
        <>
          <span className="text-md">
            {Number(splitPrice[0]).toLocaleString('en-US')}
          </span>
          {splitPrice[1] && (
            <span className="text-sm text-neutral-400">.{splitPrice[1]}</span>
          )}{' '}
          <span className="text-md">{currencySymbol}</span>
        </>
      ) : (
        <>
          <span className="text-md">{currencySymbol}</span>{' '}
          <span className="text-md">
            {Number(splitPrice[0]).toLocaleString('en-US')}
          </span>
          {splitPrice[1] && (
            <span className="text-sm text-neutral-400">.{splitPrice[1]}</span>
          )}
        </>
      )}
    </h5>
  )
}
