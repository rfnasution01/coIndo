import { LayoutDashboard, ShoppingCart, Store } from 'lucide-react'

export const ListNavigationMain = [
  {
    name: 'Homepage',
    url: '/',
    icon: <LayoutDashboard />,
  },
  {
    name: 'Exchange',
    url: '/exchange',
    icon: <ShoppingCart />,
  },
  {
    name: 'Market',
    url: '/market',
    icon: <Store />,
  },
]
