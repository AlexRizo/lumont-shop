import { prisma } from '#/lib/prisma'
import { toCart } from './cart.mapper'
import { cartRepository } from './cart.repository'

export const cartService = {
  getOrCreateCart: async (userId: string) => {
    const cart =
      (await cartRepository.findByUserId(userId)) ??
      (await cartRepository.create(userId))

    return toCart(cart)
  },

  addItem: async (userId: string, variantId: string, quantity: number) => {
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
    })

    if (!variant) throw new Error('La variante no existe')

    if (variant.stock < quantity) throw new Error('Stock insuficiente')

    const cart =
      (await cartRepository.findByUserId(userId)) ??
      (await cartRepository.create(userId))

    await cartRepository.upsertItem(cart.id, variantId, quantity)

    return cartService.getOrCreateCart(userId)
  },

  updateItemQuantity: async (
    userId: string,
    cartItemId: string,
    quantity: number,
  ) => {
    const item = await cartRepository.findItemById(cartItemId)
    const cart = await cartRepository.findByUserId(userId)

    if (!item || !cart || item.cartId !== cart.id) {
      throw new Error('El artículo no pertenece a este carrito')
    }

    await cartRepository.updateItemQuantity(cartItemId, quantity)
    return cartService.getOrCreateCart(userId)
  },

  removeItem: async (userId: string, cartItemId: string) => {
    const item = await cartRepository.findItemById(cartItemId)
    const cart = await cartRepository.findByUserId(userId)

    if (!item || !cart || item.cartId !== cart.id) {
      throw new Error('El artículo no pertenece a este carrito')
    }

    await cartRepository.removeItem(cartItemId)
    return cartService.getOrCreateCart(userId)
  },
}
