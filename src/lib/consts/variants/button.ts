import { cva } from 'class-variance-authority'

const variants = {
  solid: [
    'text-white',
    'bg-primary',
    'border',
    'border-primary',
    'hover:bg-primary-shade-1',
    'hover:border-primary-shade-1',
    'active:bg-primary-shade-1',
    'active:border-primary-shade-1',
  ],
  outlined: [
    'text-black',
    'bg-white',
    'border',
    'border-black',
    'hover:bg-neutral-100',
    'active:bg-neutral-100',
  ],
  'solid-general': [
    'text-white',
    'bg-general-tint-2',
    'border',
    'border-general',
    'hover:bg-general-tint-3',
    'hover:border-general-tint-3',
    'active:bg-general-tint-3',
    'active:border-general-tint-3',
  ],
}

export type ButtonVariants = keyof typeof variants

export const buttonVariants = cva(
  'flex items-center justify-center gap-8 p-16 leading-medium rounded-lg transition-all ease-in disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-typography-disabled disabled:border-surface-disabled disabled:shadow-disabled',
  {
    variants: {
      variant: variants,
    },
    defaultVariants: {
      variant: 'solid',
    },
  },
)
