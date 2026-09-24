import { createMiddleware } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { auth } from '#/lib/auth'
import { UserRole } from '@prisma/client'

export const sessionMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const session = await auth.api.getSession({
      headers: getRequest().headers,
    })

    return next({
      context: {
        session: session?.session ?? null,
        user: session?.user ?? null,
      },
    })
  },
)

export const requireSessionMiddleware = createMiddleware({
  type: 'function',
})
  .middleware([sessionMiddleware])
  .server(async ({ next, context }) => {
    if (!context.user) {
      throw new Error('Unauthorized')
    }

    return next({
      context: {
        user: context.user,
      },
    })
  })

export const requireAdminMiddleware = createMiddleware({ type: 'function' })
  .middleware([requireSessionMiddleware])
  .server(async ({ next, context }) => {
    if (context.user.role !== UserRole.ADMIN) {
      throw new Error('Forbidden')
    }

    return next({ context: { user: context.user } })
  })
