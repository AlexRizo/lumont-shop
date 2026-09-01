import { prisma } from '#/lib/prisma'
import type { CreateCategory } from './category.schema'

export const categoryRepository = {
  findAll: () =>
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
  findBySlug: (slug: string) =>
    prisma.category.findUnique({
      where: { slug },
    }),
  findById: (id: string) =>
    prisma.category.findUnique({
      where: { id },
    }),
  create: (data: CreateCategory) => prisma.category.create({ data }),
}
