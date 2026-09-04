import { createServerFn } from '@tanstack/react-start'
import { sessionMiddleware } from '#/server/middlewares/auth.middleware'

export const getCurrentUserFn = createServerFn({ method: 'GET' })
  .middleware([sessionMiddleware])
  .handler(({ context }) => context.user)
