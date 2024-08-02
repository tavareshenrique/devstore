'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type TCartItem = {
  productId: string
  quantity: number
}

interface ICardContextType {
  items: TCartItem[]
  addToCart: (productId: string) => void
}

interface ICardProvider {
  children: ReactNode
}

const CardContext = createContext({} as ICardContextType)

export function CartProvider({ children }: ICardProvider) {
  const [cartItems, setCartItems] = useState<TCartItem[]>([])

  function addToCart(productId: string) {
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
    <CardContext.Provider
      value={{
        items: cartItems,
        addToCart,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export const useCard = () => useContext(CardContext)
