import { prisma } from '#/lib/prisma'
import type { Prisma } from '@prisma/client'

const cartInclude = {
  items: {
    include: {
      variant: {
        include: {
          product: {
            include: { images: { orderBy: { position: 'asc' }, take: 1 } },
          },
          attributeValues: {
            include: { attributeValue: { include: { attribute: true } } },
          },
        },
      },
    },
  },
} satisfies Prisma.CartInclude

export type CartWithItems = Prisma.CartGetPayload<{
  include: typeof cartInclude
}>

export const cartRepository = {
  findByUserId: (userId: string) =>
    prisma.cart.findUnique({
      where: { userId },
      include: cartInclude,
    }),

  create: (userId: string) =>
    prisma.cart.create({ data: { userId }, include: cartInclude }),

  upsertItem: (cartId: string, variantId: string, quantity: number) =>
    prisma.cartItem.upsert({
      where: { cartId_variantId: { cartId, variantId } },
      create: { cartId, variantId, quantity },
      update: { quantity: { increment: quantity } },
    }),

  findItemById: (cartItemId: string) =>
    prisma.cartItem.findUnique({
      where: { id: cartItemId },
    }),

  updateItemQuantity: (cartItemId: string, quantity: number) =>
    prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    }),

  removeItem: (cartItemId: string) =>
    prisma.cartItem.delete({
      where: { id: cartItemId },
    }),
}
