'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useStore } from '@/lib/store-context'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function ProductsPage() {
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const [filter, setFilter] = useState('All')
  const { toast } = useToast()

  const products = [
    { id: 1, name: 'Classic Oxford Shirt', price: 89, category: 'Shirts', image: '/white-oxford-shirt.png' },
    { id: 2, name: 'Merino Wool Sweater', price: 149, category: 'Knitwear', image: '/mens-sweater-beige.jpg' },
    { id: 3, name: 'Tailored Chinos', price: 119, category: 'Trousers', image: '/beige-chino-pants.png' },
    { id: 4, name: 'Cotton Polo Shirt', price: 69, category: 'Shirts', image: '/navy-polo-shirt.jpg' },
    { id: 5, name: 'Wool Overcoat', price: 299, category: 'Outerwear', image: '/mens-wool-coat-camel.jpg' },
    { id: 6, name: 'Linen Blazer', price: 189, category: 'Outerwear', image: '/beige-linen-blazer.jpg' },
    { id: 7, name: 'Cashmere Cardigan', price: 179, category: 'Knitwear', image: '/grey-cashmere-cardigan.jpg' },
    { id: 8, name: 'Dress Trousers', price: 129, category: 'Trousers', image: '/grey-dress-pants.jpg' },
  ]

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter)

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product)
    toast({
      title: "تم إضافة منتجك بنجاح ✓",
      description: `${product.name} تمت إضافته إلى السلة`,
      duration: 2000,
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault()
    const wasAlreadyFavorite = isFavorite(product.id)
    toggleFavorite(product.id)
    
    if (!wasAlreadyFavorite) {
      toast({
        title: "تم إضافة منتجك بنجاح ✓",
        description: `${product.name} تمت إضافته إلى المفضلة`,
        duration: 2000,
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] pb-20">
      <Header />
      
      {/* Page Title */}
      <section className="px-4 py-8 border-b border-[#D9CFC7]">
        <h1 className="font-serif text-3xl font-bold text-[#2A2723] mb-2">
          All Products
        </h1>
        <p className="text-[#6B6561]">
          {filteredProducts.length} items
        </p>
      </section>

      {/* Filters */}
      <section className="px-4 py-4 border-b border-[#D9CFC7]">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {['All', 'Shirts', 'Outerwear', 'Knitwear', 'Trousers'].map((filterName) => (
            <button
              key={filterName}
              onClick={() => setFilter(filterName)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === filterName
                  ? 'bg-[#2A2723] text-[#F9F8F6]' 
                  : 'bg-[#EFE9E3] text-[#6B6561]'
              }`}
            >
              {filterName}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <Link href={`/products/${product.id}`}>
                <div className="aspect-[3/4] bg-[#EFE9E3] rounded-2xl overflow-hidden mb-3 relative">
                  <img 
                    src={product.image || "/placeholder.svg"} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => handleToggleFavorite(e, product)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-colors ${
                        isFavorite(product.id) 
                          ? 'fill-red-500 stroke-red-500' 
                          : 'stroke-[#2A2723]'
                      }`}
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
                onClick={() => handleAddToCart(product)}
                className="w-full mt-3 bg-[#C9B59C] hover:bg-[#B8A58B] text-[#2A2723] font-medium rounded-full h-10"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </section>

      <MobileNav />
    </div>
  )
}
