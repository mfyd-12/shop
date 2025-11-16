import Link from 'next/link'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  const categories = [
    { name: 'Outerwear', image: '/mens-jacket-minimal.jpg' },
    { name: 'Shirts', image: '/mens-dress-shirt.jpg' },
    { name: 'Knitwear', image: '/mens-sweater-minimal.jpg' },
    { name: 'Trousers', image: '/mens-trousers-minimal.jpg' },
  ]

  const featured = [
    { id: 1, name: 'Classic Oxford Shirt', price: 89, image: '/white-oxford-shirt.png' },
    { id: 2, name: 'Merino Wool Sweater', price: 149, image: '/mens-sweater-beige.jpg' },
    { id: 3, name: 'Tailored Chinos', price: 119, image: '/beige-chino-pants.png' },
  ]

  return (
    <div className="min-h-screen bg-[#F9F8F6] pb-20">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-[#EFE9E3] overflow-hidden">
        <img 
          src="/stylish-man-minimal-fashion-portrait.jpg" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2723]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3 text-balance">
            Timeless Elegance, Modern Comfort
          </h2>
          <p className="text-white/90 text-lg mb-6 text-pretty">
            Discover our new Spring collection
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-[#C9B59C] hover:bg-[#B8A58B] text-[#2A2723] font-medium rounded-full h-12 px-8"
          >
            <Link href="/products">
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-12">
        <h3 className="font-serif text-2xl font-bold text-[#2A2723] mb-6">
          Shop by Category
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.name}
              href="/products"
              className="group"
            >
              <div className="aspect-square bg-[#EFE9E3] rounded-2xl overflow-hidden mb-3">
                <img 
                  src={category.image || "/placeholder.svg"} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-medium text-[#2A2723] text-center">
                {category.name}
              </h4>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-2xl font-bold text-[#2A2723]">
            Featured Items
          </h3>
          <Link href="/products" className="text-[#C9B59C] text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {featured.map((product) => (
            <Link 
              key={product.id}
              href={`/products/${product.id}`}
              className="flex gap-4 bg-[#EFE9E3] rounded-2xl overflow-hidden group"
            >
              <div className="w-32 h-32 flex-shrink-0">
                <img 
                  src={product.image || "/placeholder.svg"} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center py-4 pr-4">
                <h4 className="font-medium text-[#2A2723] mb-1">
                  {product.name}
                </h4>
                <p className="text-[#6B6561] text-sm mb-2">Premium quality</p>
                <p className="font-serif text-lg font-semibold text-[#2A2723]">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <MobileNav />
    </div>
  )
}
