'use client'

import { useStore } from '@/lib/store-context'
import Link from 'next/link'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function CartPage() {
  const { cart } = useStore()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 12
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-[#F9F8F6] pb-20">
      <Header />
      
      {/* Page Title */}
      <section className="px-4 py-8 border-b border-[#D9CFC7]">
        <h1 className="font-serif text-3xl font-bold text-[#2A2723] mb-2">
          Shopping Cart
        </h1>
        <p className="text-[#6B6561]">
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </p>
      </section>

      {/* Cart Items */}
      {cart.length > 0 ? (
        <>
          <section className="px-4 py-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-[#EFE9E3] rounded-2xl p-4">
                <div className="flex gap-4 mb-4">
                  <div className="w-24 h-24 flex-shrink-0 bg-[#F9F8F6] rounded-xl overflow-hidden">
                    <img 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#2A2723] mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#6B6561] mb-2">
                      Size: {item.size}
                    </p>
                    <p className="font-serif text-lg font-semibold text-[#2A2723]">
                      ${item.price}
                    </p>
                  </div>
                  <button 
                    className="p-2 h-fit"
                  >
                    <Trash2 className="w-5 h-5 text-[#6B6561]" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-3 bg-[#F9F8F6] rounded-full px-4 py-2">
                    <button 
                      className="p-1"
                    >
                      <Minus className="w-4 h-4 text-[#2A2723]" />
                    </button>
                    <span className="font-medium text-[#2A2723] w-8 text-center">
                      {item.quantity}
                    </span>
                    <button 
                      className="p-1"
                    >
                      <Plus className="w-4 h-4 text-[#2A2723]" />
                    </button>
                  </div>
                  <p className="font-serif text-xl font-semibold text-[#2A2723]">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Summary */}
          <section className="px-4 pb-6">
            <div className="bg-[#EFE9E3] rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#2A2723] pb-3 border-b border-[#D9CFC7]">
                Order Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-[#6B6561]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#2A2723]">${subtotal}</span>
                </div>
                <div className="flex justify-between text-[#6B6561]">
                  <span>Shipping</span>
                  <span className="font-medium text-[#2A2723]">${shipping}</span>
                </div>
                <div className="pt-3 border-t border-[#D9CFC7] flex justify-between">
                  <span className="font-serif text-lg font-bold text-[#2A2723]">Total</span>
                  <span className="font-serif text-xl font-bold text-[#2A2723]">${total}</span>
                </div>
              </div>

              <Button 
                className="w-full bg-[#2A2723] hover:bg-[#3A3733] text-[#F9F8F6] font-medium rounded-full h-14 text-lg mt-6"
              >
                Proceed to Checkout
              </Button>
              
              <Link href="/products">
                <Button 
                  variant="outline"
                  className="w-full border-[#D9CFC7] text-[#2A2723] font-medium rounded-full h-12"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </section>
        </>
      ) : (
        <section className="px-4 py-16 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-24 h-24 bg-[#EFE9E3] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛍️</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2A2723] mb-3">
              Your cart is empty
            </h2>
            <p className="text-[#6B6561] mb-8">
              Start adding some items to your cart to see them here.
            </p>
            <Button 
              asChild
              className="bg-[#2A2723] hover:bg-[#3A3733] text-[#F9F8F6] font-medium rounded-full h-12 px-8"
            >
              <Link href="/products">
                Shop Now
              </Link>
            </Button>
          </div>
        </section>
      )}

      <MobileNav />
    </div>
  )
}
