import { badgeVariants } from '@/lib/consts/variants/badge'
import type { VariantProps } from 'class-variance-authority'

export interface BadgeProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof badgeVariants> {
  classes?: string
}

export const Badge = ({
  classes = '',
  variant,
  children,
  ...props
}: BadgeProps) => {
  return (
    <div className={`${badgeVariants({ variant })} ${classes}`} {...props}>
      {children}
    </div>
  )
}
