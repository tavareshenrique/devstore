'use client'

import { useCart } from '@/context/cart-context'

interface IAddToCartButtonProps {
  productId: number
}

export function AddToCartButton({ productId }: IAddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddToCart() {
    addToCart(productId)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao Carrinho
    </button>
  )
}
