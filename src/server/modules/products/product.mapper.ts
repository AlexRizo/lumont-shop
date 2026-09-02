import type {
  Product as PrismaProduct,
  ProductImage as PrismaProductImage,
  ProductVariant as PrismaProductVariant,
  AttributeValue as PrismaAttributeValue,
  Attribute as PrismaAttribute,
  VariantAttributeValue as PrismaVariantAttributeValue,
} from '@prisma/client'

type ProductWithRelations = PrismaProduct & {
  images: PrismaProductImage[]
  variants: PrismaProductVariant[]
}

type VariantAttributeValueWithRelations = PrismaVariantAttributeValue & {
  attributeValue: PrismaAttributeValue & { attributeValue: PrismaAttribute }
}

type ProductVariantWithAttributes = PrismaProductVariant & {
  attributeValues: VariantAttributeValueWithRelations[]
}

type ProductDetailWithRelations = PrismaProduct & {
  images: PrismaProductImage[]
  variants: ProductVariantWithAttributes[]
}

export const toVariant = (variant: PrismaProductVariant) => {
  return {
    id: variant.id,
    sku: variant.sku,
    price: variant.price.toString(),
    stock: variant.stock,
  }
}

export const toVariantDetail = (variant: ProductVariantWithAttributes) => {
  return {
    ...toVariant(variant),
    attributes: variant.attributeValues.map((vaa) => ({
      attributeName: vaa.attributeValue.attributeValue.name,
      value: vaa.attributeValue.value,
    })),
  }
}

export const toProductListItem = (product: ProductWithRelations) => {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    status: product.status,
    images: product.images.map((image) => ({
      url: image.url,
      altText: image.altText,
    })),
    variants: product.variants.map(toVariant),
  }
}

export const toProductDetail = (product: ProductDetailWithRelations) => {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    status: product.status,
    images: product.images.map((image) => ({
      url: image.url,
      altText: image.altText,
    })),
    variants: product.variants.map(toVariantDetail),
  }
}
