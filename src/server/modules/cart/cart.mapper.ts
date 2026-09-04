import { Decimal } from '@prisma/client/runtime/client'
import type { CartWithItems } from './cart.repository'

type CartItemWithVariant = CartWithItems['items'][number]

export const toCartItem = (item: CartItemWithVariant) => {
  const { variant } = item

  return {
    id: item.id,
    variantId: item.variantId,
    productName: variant.product.name,
    productSlug: variant.product.slug,
    sku: variant.sku,
    imageUrl: variant.product.images[0]?.url ?? null,
    attributes: variant.attributeValues.map((av) => ({
      name: av.attributeValue.attribute.name,
      value: av.attributeValue.value,
    })),
    unitPrice: variant.price.toString(),
    quantity: item.quantity,
    lineTotal: variant.price.times(item.quantity).toString(),
    stock: variant.stock,
  }
}

export const toCart = (cart: CartWithItems) => {
  const items = cart.items.map(toCartItem)

  const subtotal = cart.items.reduce(
    (acc, item) => acc.plus(item.variant.price.times(item.quantity)),
    new Decimal('0'),
  )

  return {
    id: cart.id,
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: subtotal.toString(),
  }
}

