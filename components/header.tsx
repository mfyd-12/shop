'use client'

import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store-context'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart } = useStore()

  const categories = [
    { name: 'جميع المنتجات', href: '/products' },
    { name: 'القمصان', href: '/products?category=shirts' },
    { name: 'السراويل', href: '/products?category=pants' },
    { name: 'الجاكيتات', href: '/products?category=jackets' },
    { name: 'الإكسسوارات', href: '/products?category=accessories' },
  ]

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header className="sticky top-0 bg-[#F9F8F6] border-b border-[#D9CFC7] z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <button 
            className="p-2 -ml-2"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-[#2A2723]" />
          </button>
          
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold tracking-tight text-[#2A2723]">
              REEVE
            </h1>
          </Link>
          
          <Link href="/cart" className="p-2 -mr-2 relative">
            <ShoppingBag className="w-6 h-6 text-[#2A2723]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9B59C] text-[#2A2723] text-xs font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="absolute top-0 left-0 h-full w-[280px] bg-[#F9F8F6] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-[#D9CFC7]">
              <h2 className="font-serif text-xl font-bold text-[#2A2723]">
                الأقسام
              </h2>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2"
              >
                <X className="w-6 h-6 text-[#2A2723]" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={category.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-[#2A2723] font-medium hover:bg-[#EFE9E3] transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#D9CFC7]">
              <Link
                href="/account"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-center bg-[#2A2723] text-[#F9F8F6] font-medium hover:bg-[#3A3733] transition-colors"
              >
                حسابي
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
