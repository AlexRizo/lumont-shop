import { PrismaClient } from '@prisma/client'

const isDevelopment = process.env.NODE_ENV !== 'production'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isDevelopment ? ['query', 'info', 'warn', 'error'] : ['error'],
  })

if (isDevelopment) globalForPrisma.prisma = prisma
