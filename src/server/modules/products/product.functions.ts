import { createServerFn } from '@tanstack/react-start'
import { ListProductsFilterSchema } from './product.schema'
import { productService } from './product.service'

export const listProductsFn = createServerFn({ method: 'GET' })
  .validator(ListProductsFilterSchema)
  .handler(({ data }) => productService.listProducts(data))

export const getProductBySlugFn = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(({ data: slug }) => productService.getProductBySlug(slug))
