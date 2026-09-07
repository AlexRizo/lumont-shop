import { sessionMiddleware } from '#/server/middlewares/auth.middleware'
import { createServerFn } from '@tanstack/react-start'
import {
  AddCartItemSchema,
  RemoveCartItemSchema,
  UpdateCartItemSchema,
} from './cart.schema'
import { cartService } from './cart.service'

export const getCartFn = createServerFn({ method: 'GET' })
  .middleware([sessionMiddleware])
  .handler(({ context }) =>
    context.user ? cartService.getOrCreateCart(context.user.id) : null,
  )

export const addCartItemFn = createServerFn({ method: 'POST' })
  .middleware([sessionMiddleware])
  .validator(AddCartItemSchema)
  .handler(async ({ data, context }) => {
    if (!context.user) throw new Error('Unauthorized')

    return await cartService.addItem(
      context.user.id,
      data.variantId,
      data.quantity,
    )
  })

export const updateCartItemFn = createServerFn({ method: 'POST' })
  .middleware([sessionMiddleware])
  .validator(UpdateCartItemSchema)
  .handler(async ({ data, context }) => {
    if (!context.user) throw new Error('Unauthorized')

    return await cartService.updateItemQuantity(
      context.user.id,
      data.cartItemId,
      data.quantity,
    )
  })

export const removeCartItemFn = createServerFn({ method: 'POST' })
  .middleware([sessionMiddleware])
  .validator(RemoveCartItemSchema)
  .handler(async ({ data, context }) => {
    if (!context.user) throw new Error('Unauthorized')

    return await cartService.removeItem(context.user.id, data.cartItemId)
  })
