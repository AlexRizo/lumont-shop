import { betterAuth } from 'better-auth'
import { anonymous } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma'
import { cartService } from '#/server/modules/cart/cart.service'
import { env } from '#/env'

interface SendEmailParams {
  to: string
  subject: string
  body: string
}

export const sendEmail = async ({ to, subject, body }: SendEmailParams) => {
  // TODO: implement
  console.log('─────────────────────────────────────')
  console.log(`📧  Email a: ${to}`)
  console.log(`    Asunto: ${subject}`)
  console.log(`    Cuerpo: ${body}`)
  console.log('─────────────────────────────────────')
}

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Restablecer Contraseña',
        body: `Por favor, haz clic en el siguiente enlace para restablecer tu contraseña: ${url}`,
      })
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verificar Correo Electrónico',
        body: `Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: ${url}`,
      })
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
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
        await cartService.mergeAnonymousCart(
          anonymousUser.user.id,
          newUser.user.id,
        )
      },
    }),
    tanstackStartCookies(),
  ],
})

export type Session = typeof auth.$Infer.Session
