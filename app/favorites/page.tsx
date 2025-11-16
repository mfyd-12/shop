'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useStore } from '@/lib/store-context'

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useStore()

  const allProducts = [
    { id: 1, name: 'Classic Oxford Shirt', price: 89, category: 'Shirts', image: '/white-oxford-shirt.png' },
    { id: 2, name: 'Merino Wool Sweater', price: 149, category: 'Knitwear', image: '/mens-sweater-beige.jpg' },
    { id: 3, name: 'Tailored Chinos', price: 119, category: 'Trousers', image: '/beige-chino-pants.png' },
    { id: 4, name: 'Cotton Polo Shirt', price: 69, category: 'Shirts', image: '/navy-polo-shirt.jpg' },
    { id: 5, name: 'Wool Overcoat', price: 299, category: 'Outerwear', image: '/mens-wool-coat-camel.jpg' },
    { id: 6, name: 'Linen Blazer', price: 189, category: 'Outerwear', image: '/beige-linen-blazer.jpg' },
    { id: 7, name: 'Cashmere Cardigan', price: 179, category: 'Knitwear', image: '/grey-cashmere-cardigan.jpg' },
    { id: 8, name: 'Dress Trousers', price: 129, category: 'Trousers', image: '/grey-dress-pants.jpg' },
  ]

  const favoriteProducts = allProducts.filter(product => favorites.includes(product.id))

  return (
    <div className="min-h-screen bg-[#F9F8F6] pb-20">
      <Header />
      
      {/* Page Title */}
      <section className="px-4 py-8 border-b border-[#D9CFC7]">
        <h1 className="font-serif text-3xl font-bold text-[#2A2723] mb-2">
          My Favorites
        </h1>
        <p className="text-[#6B6561]">
          {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'}
        </p>
      </section>

      {/* Favorites Grid */}
      {favoriteProducts.length > 0 ? (
        <section className="px-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-[3/4] bg-[#EFE9E3] rounded-2xl overflow-hidden mb-3 relative">
                    <img 
                      src={product.image || "/placeholder.svg"} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(product.id)
                      }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart 
                        className="w-5 h-5 fill-red-500 stroke-red-500"
                      />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-[#6B6561] uppercase tracking-wide">
                      {product.category}
                    </p>
                    <h3 className="font-medium text-[#2A2723] text-sm leading-tight">
                      {product.name}
                    </h3>
                    <p className="font-serif text-lg font-semibold text-[#2A2723]">
                      ${product.price}
                    </p>
                  </div>
                </Link>
                <Button 
                  onClick={() => addToCart(product)}
                  className="w-full mt-3 bg-[#C9B59C] hover:bg-[#B8A58B] text-[#2A2723] font-medium rounded-full h-10"
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="px-4 py-16 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-24 h-24 bg-[#EFE9E3] rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-[#C9B59C]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2A2723] mb-3">
              No favorites yet
            </h2>
            <p className="text-[#6B6561] mb-8">
              Start adding items to your favorites by tapping the heart icon on products.
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
