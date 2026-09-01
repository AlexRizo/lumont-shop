import { env } from '#/env'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const isDevelopment = process.env.NODE_ENV !== 'production'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
})

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: isDevelopment ? ['query', 'info', 'warn', 'error'] : ['error'],
  })

if (isDevelopment) globalForPrisma.prisma = prisma
