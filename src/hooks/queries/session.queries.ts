import { getCurrentUserFn } from '#/server/modules/auth/auth.functions'
import { queryOptions } from '@tanstack/react-query'

export const sessionQueryOptions = () =>
  queryOptions({
    queryKey: ['session'],
    queryFn: () => getCurrentUserFn(),
  })
