import { ProductStatus } from '@prisma/client'
import { z } from 'zod'

export const ProductVariantSchema = z.object({
  id: z.cuid2(),
  sku: z.string(),
  price: z.string(),
  stock: z.number().int(),
})

export const ProductImageSchema = z.object({
  url: z.string(),
  altText: z.string().nullable(),
})

export const ProductVariantAttributeSchema = z.object({
  attributeName: z.string(),
  value: z.string(),
})

export const ProductVariantDetailSchema = ProductVariantSchema.extend({
  attributes: z.array(ProductVariantAttributeSchema),
})

export const ProductListItemSchema = z.object({
  id: z.cuid2(),
  slug: z.string(),
  name: z.string(),
  status: z.enum(ProductStatus),
  images: z.array(ProductImageSchema),
  variants: z.array(ProductVariantSchema),
})

export const ProductDetailSchema = ProductListItemSchema.omit({
  variants: true,
}).extend({
  variants: z.array(ProductVariantDetailSchema),
  description: z.string().nullable(),
})

export const ListProductsFilterSchema = z.object({
  categorySlug: z.string().optional(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(50).default(20),
})

export type ProductVariant = z.infer<typeof ProductVariantSchema>
export type ProductListItem = z.infer<typeof ProductListItemSchema>
export type ListProductsFilter = z.infer<typeof ListProductsFilterSchema>

export type ProductVariantDetail = z.infer<typeof ProductVariantDetailSchema>
export type ProductDetail = z.infer<typeof ProductDetailSchema>
