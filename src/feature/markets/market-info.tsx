import { ReactNode } from 'react'
export function MarketInfo({
  card1,
  card2,
  card3,
}: {
  card1?: ReactNode
  card2?: ReactNode
  card3?: ReactNode
}) {
  return (
    <div className="grid grid-cols-12 gap-32 phones:hidden">
      {card1}
      {card2}
      {card3}
    </div>
  )
}
