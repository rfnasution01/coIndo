import { cardVariants } from '@/lib/consts/variants/card'
import { VariantProps } from 'class-variance-authority'

export interface CardProps
  extends Omit<React.ComponentProps<'div'>, 'color'>,
    VariantProps<typeof cardVariants> {
  classes?: string
}

export const Card = ({
  children,
  classes = '',
  variant,
  color,
  radius,
  ...props
}: CardProps) => {
  return (
    <div
      className={`${cardVariants({ variant, color, radius })} ${classes}`}
      {...props}
    >
      {children}
    </div>
  )
}
