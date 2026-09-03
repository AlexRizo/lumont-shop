import { listProductsFn } from '#/server/modules/products/product.functions'
import type { ListProductsFilter } from '#/server/modules/products/product.schema'
import { queryOptions } from '@tanstack/react-query'

export const productsQueryOptions = (filter: ListProductsFilter) => {
  return queryOptions({
    queryKey: ['products', filter],
    queryFn: () => listProductsFn({ data: filter }),
  })
}
