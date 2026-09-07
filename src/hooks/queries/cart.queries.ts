import { queryOptions } from '@tanstack/react-query'
import { getCartFn } from '#/server/modules/cart'

export const cartQueryOptions = () =>
  queryOptions({
    queryKey: ['cart'],
    queryFn: () => getCartFn(),
  })
