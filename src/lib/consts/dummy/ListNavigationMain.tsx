import { LayoutDashboard, ShoppingCart, Store } from 'lucide-react'

export const ListNavigationMain = [
  {
    name: 'Homepage',
    url: '/',
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: 'Exchange',
    url: '/exchange',
    icon: <ShoppingCart size={18} />,
  },
  {
    name: 'Market',
    url: '/market',
    icon: <Store size={18} />,
  },
]
