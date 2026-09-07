import { betterAuth } from 'better-auth'
import { anonymous } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma'
import { mergeAnonymousCart } from '#/server/modules/cart'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'CUSTOMER',
        input: false,
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  plugins: [
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        await mergeAnonymousCart(anonymousUser.user.id, newUser.user.id)
      },
    }),
    tanstackStartCookies(),
  ],
})

export type Session = typeof auth.$Infer.Session
