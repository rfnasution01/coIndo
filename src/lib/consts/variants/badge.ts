import { cva } from 'class-variance-authority'

export const variants = {
  general: ['bg-general-tint-1', 'border-general', 'text-general'],
  warning: ['bg-warning-tint-1', 'border-warning', 'text-warning'],
  success: ['bg-success-tint-2', 'border-success', 'text-success'],
  danger: ['bg-danger-tint-1', 'border-danger', 'text-danger'],
  secondary: [
    'bg-warning-tint-1',
    'border-success-shade-1',
    'text-success-shade-1',
  ],
  primary: [
    'bg-primary-tint-3',
    'border-primary-tint-2',
    'text-primary-tint-2',
  ],
}

export type BadgeVariants = keyof typeof variants

export const badgeVariants = cva(
  'flex items-center w-fit rounded-full px-12 py-[0.6rem] border',
  {
    variants: {
      variant: variants,
    },
    defaultVariants: {
      variant: 'general',
    },
  },
)
