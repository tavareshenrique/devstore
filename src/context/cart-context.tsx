'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type TCartItem = {
  productId: number
  quantity: number
}

interface ICartContextType {
  items: TCartItem[]
  addToCart: (productId: number) => void
}

interface ICartProvider {
  children: ReactNode
}

const CartContext = createContext({} as ICartContextType)

export function CartProvider({ children }: ICartProvider) {
  const [cartItems, setCartItems] = useState<TCartItem[]>([])

  function addToCart(productId: number) {
    setCartItems((prevItems) => {
      const productInCart = prevItems.some(
        (item) => item.productId === productId,
      )

      if (productInCart) {
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      } else {
        return [...prevItems, { productId, quantity: 1 }]
      }
    })
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
