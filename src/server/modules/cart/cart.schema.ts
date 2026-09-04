import { z } from 'zod'
import { ProductVariantAttributeSchema } from '../products/product.schema'

export const AddCartItemSchema = z.object({
  variantId: z.cuid2(),
  quantity: z.number().int().positive().default(1),
})

export const UpdateCartItemSchema = z.object({
  cartItemId: z.cuid2(),
  quantity: z.number().int().positive(),
})

export const RemoveCartItemSchema = z.object({
  cartItemId: z.cuid2(),
})

export const CartItemSchema = z.object({
  id: z.cuid2(),
  variantId: z.cuid2(),
  productName: z.string(),
  productSlug: z.string(),
  sku: z.string(),
  imageUrl: z.string().nullable(),
  attributes: z.array(ProductVariantAttributeSchema),
  quantity: z.number().int(),
  unitPrice: z.string(),
  lineTotal: z.string(),
  stock: z.number().int(),
})

export const CartSchema = z.object({
  id: z.cuid2(),
  items: z.array(CartItemSchema),
  itemCount: z.number().int(),
  subtotal: z.string(),
})

export type AddCartItem = z.infer<typeof AddCartItemSchema>
export type UpdateCartItem = z.infer<typeof UpdateCartItemSchema>
export type RemoveCartItem = z.infer<typeof RemoveCartItemSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type Cart = z.infer<typeof CartSchema>