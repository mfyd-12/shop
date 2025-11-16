'use client'

import Link from 'next/link'
import { Home, ShoppingBag, User, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function MobileNav() {
  const pathname = usePathname()
  
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Shop', href: '/products' },
    { icon: ShoppingBag, label: 'Cart', href: '/cart' },
    { icon: User, label: 'Account', href: '/account' },
  ]
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#EFE9E3] border-t border-[#D9CFC7] z-50">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 flex-1"
            >
              <Icon 
                className={`w-5 h-5 ${isActive ? 'text-[#2A2723]' : 'text-[#6B6561]'}`} 
              />
              <span className={`text-xs ${isActive ? 'text-[#2A2723] font-medium' : 'text-[#6B6561]'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
