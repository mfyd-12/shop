'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  size: string
  image: string
  category: string
}

type StoreContextType = {
  cart: CartItem[]
  favorites: number[]
  addToCart: (product: any) => void
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedFavorites = localStorage.getItem('favorites')
    
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Save to localStorage whenever favorites changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToCart = (product: any) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id && item.size === product.size)
      
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        )
      } else {
        return [...currentCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity || 1,
          size: product.size || 'M',
          image: product.image,
          category: product.category
        }]
      }
    })
  }

  const toggleFavorite = (productId: number) => {
    setFavorites(currentFavorites => {
      if (currentFavorites.includes(productId)) {
        return currentFavorites.filter(id => id !== productId)
      } else {
        return [...currentFavorites, productId]
      }
    })
  }

  const isFavorite = (productId: number) => {
    return favorites.includes(productId)
  }

  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  return (
    <StoreContext.Provider value={{ cart, favorites, addToCart, toggleFavorite, isFavorite, removeFromCart, updateQuantity }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
