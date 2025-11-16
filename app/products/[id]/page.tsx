'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Heart, Share2, Minus, Plus, X } from 'lucide-react'
import { useStore } from '@/lib/store-context'
import { useToast } from '@/hooks/use-toast'

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [showShareMenu, setShowShareMenu] = useState(false)
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const { toast } = useToast()

  const product = {
    id: 1,
    name: 'Classic Oxford Shirt',
    price: 89,
    description: 'Crafted from premium 100% cotton, this classic Oxford shirt features a button-down collar and a refined fit that transitions seamlessly from office to evening.',
    images: [
      '/white-oxford-shirt-front.jpg',
      '/white-oxford-shirt-back.jpg',
      '/white-oxford-shirt-detail.jpg',
    ],
    image: '/white-oxford-shirt-front.jpg',
    category: 'Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    details: [
      '100% Premium Cotton',
      'Button-down collar',
      'Long sleeves with button cuffs',
      'Classic fit',
      'Machine washable',
    ]
  }

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'instagram') => {
    const productUrl = typeof window !== 'undefined' ? window.location.href : ''
    const shareText = `تحقق من هذا المنتج الرائع: ${product.name} - $${product.price}`

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + productUrl)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank')
        break
      case 'instagram':
        navigator.clipboard.writeText(productUrl)
        toast({
          title: "تم النسخ إلى الحافظة",
          description: "يمكنك الآن لصقه في Instagram",
          duration: 2000,
        })
        break
    }
    
    setShowShareMenu(false)
    
    if (platform !== 'instagram') {
      toast({
        title: "تم فتح المشاركة",
        description: `جاري المشاركة عبر ${platform === 'whatsapp' ? 'واتساب' : 'فيسبوك'}`,
        duration: 2000,
      })
    }
  }

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize, quantity })
    toast({
      title: "تم إضافة منتجك بنجاح ✓",
      description: `${product.name} - الكمية: ${quantity} - المقاس: ${selectedSize}`,
      duration: 2000,
    })
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
    const isCurrentlyFavorite = isFavorite(product.id)
    toast({
      title: isCurrentlyFavorite ? "تم إزالة من المفضلة" : "تم إضافة منتجك بنجاح ✓",
      description: isCurrentlyFavorite ? `تم إزالة ${product.name} من المفضلة` : `تم إضافة ${product.name} إلى المفضلة`,
      duration: 2000,
    })
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] pb-20">
      <Header />
      
      {/* Back Button */}
      <div className="px-4 py-4 border-b border-[#D9CFC7]">
        <Link 
          href="/products" 
          className="inline-flex items-center text-[#2A2723] font-medium"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Products
        </Link>
      </div>

      {/* Product Images */}
      <section className="px-4 py-6">
        <div className="space-y-4">
          {product.images.map((image, index) => (
            <div key={index} className="aspect-[4/5] bg-[#EFE9E3] rounded-2xl overflow-hidden">
              <img 
                src={image || "/placeholder.svg"} 
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Product Info */}
      <section className="px-4 pb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#2A2723] mb-2">
              {product.name}
            </h1>
            <p className="font-serif text-2xl font-semibold text-[#2A2723]">
              ${product.price}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleToggleFavorite}
              className="p-2 bg-[#EFE9E3] rounded-full hover:bg-[#D9CFC7] transition-all active:scale-95"
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  isFavorite(product.id) 
                    ? 'fill-[#C9B59C] text-[#C9B59C]' 
                    : 'text-[#2A2723]'
                }`} 
              />
            </button>
            <button 
              onClick={() => setShowShareMenu(true)}
              className="p-2 bg-[#EFE9E3] rounded-full hover:bg-[#D9CFC7] transition-all active:scale-95"
            >
              <Share2 className="w-5 h-5 text-[#2A2723]" />
            </button>
          </div>
        </div>

        <p className="text-[#6B6561] leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Size Selection */}
        <div className="mb-6">
          <h3 className="font-medium text-[#2A2723] mb-3">Select Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-14 h-14 rounded-full font-medium transition-all active:scale-95 ${
                  selectedSize === size
                    ? 'bg-[#2A2723] text-[#F9F8F6]'
                    : 'bg-[#EFE9E3] text-[#2A2723] hover:bg-[#D9CFC7]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <h3 className="font-medium text-[#2A2723] mb-3">Quantity</h3>
          <div className="inline-flex items-center gap-4 bg-[#EFE9E3] rounded-full px-4 py-2">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 hover:bg-[#D9CFC7] rounded-full transition-all active:scale-95"
            >
              <Minus className="w-5 h-5 text-[#2A2723]" />
            </button>
            <span className="font-medium text-[#2A2723] w-8 text-center">
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 hover:bg-[#D9CFC7] rounded-full transition-all active:scale-95"
            >
              <Plus className="w-5 h-5 text-[#2A2723]" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-[#EFE9E3] rounded-2xl p-6 mb-6">
          <h3 className="font-medium text-[#2A2723] mb-3">Product Details</h3>
          <ul className="space-y-2">
            {product.details.map((detail, index) => (
              <li key={index} className="text-[#6B6561] flex items-start">
                <span className="mr-2">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button 
          onClick={handleAddToCart}
          className="w-full bg-[#2A2723] hover:bg-[#3A3733] text-[#F9F8F6] font-medium rounded-full h-14 text-lg transition-all active:scale-[0.98]"
        >
          Add to Cart - ${product.price * quantity}
        </Button>
      </section>

      {/* Share Menu Overlay */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end mb-10
        "
          onClick={() => setShowShareMenu(false)}
        >
          <div 
            className="bg-[#F9F8F6] w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#2A2723]">
                مشاركة المنتج
              </h3>
              <button 
                onClick={() => setShowShareMenu(false)}
                className="p-2 hover:bg-[#EFE9E3] rounded-full transition-all"
              >
                <X className="w-5 h-5 text-[#2A2723]" />
              </button>
            </div>

            <div className="space-y-3">
              {/* WhatsApp */}
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center gap-4 p-4 bg-[#EFE9E3] hover:bg-[#D9CFC7] rounded-2xl transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="text-right flex-1">
                  <p className="font-medium text-[#2A2723]">واتساب</p>
                  <p className="text-sm text-[#6B6561]">مشاركة عبر WhatsApp</p>
                </div>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-4 p-4 bg-[#EFE9E3] hover:bg-[#D9CFC7] rounded-2xl transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="text-right flex-1">
                  <p className="font-medium text-[#2A2723]">فيسبوك</p>
                  <p className="text-sm text-[#6B6561]">مشاركة عبر Facebook</p>
                </div>
              </button>

              {/* Instagram */}
              <button
                onClick={() => handleShare('instagram')}
                className="w-full flex items-center gap-4 p-4 bg-[#EFE9E3] hover:bg-[#D9CFC7] rounded-2xl transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.013-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="text-right flex-1">
                  <p className="font-medium text-[#2A2723]">انستغرام</p>
                  <p className="text-sm text-[#6B6561]">نسخ الرابط للمشاركة</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <MobileNav />
    </div>
  )
}
