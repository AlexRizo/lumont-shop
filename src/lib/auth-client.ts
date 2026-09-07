import { createAuthClient } from 'better-auth/react'
import {
  anonymousClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins'
import type { auth } from './auth'
import { env } from '#/env'

export const authClient = createAuthClient({
  baseURL: env.VITE_BASE_URL,
  plugins: [anonymousClient(), inferAdditionalFields<typeof auth>()],
})
