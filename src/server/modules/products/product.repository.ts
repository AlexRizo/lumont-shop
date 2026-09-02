import { prisma } from '#/lib/prisma'
import type { ListProductsFilter } from './product.schema'

export const productRepository = {
  findMany: ({ categorySlug, page, pageSize }: ListProductsFilter) => {
    return prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      },
      include: {
        images: { orderBy: { position: 'asc' }, take: 1 },
        variants: { orderBy: { price: 'asc' } },
      },
      orderBy: { createdAt: 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
  },

  findBySlug: (slug: string) => {
    return prisma.product.findUnique({
      where: { slug, status: 'ACTIVE' },
      include: {
        images: { orderBy: { position: 'asc' } },
        variants: {
          include: {
            attributeValues: {
              include: {
                attributeValue: {
                  include: { attribute: true },
                },
              },
            },
          },
        },
      },
    })
  },

  count: ({ categorySlug }: Pick<ListProductsFilter, 'categorySlug'>) =>
    prisma.product.count({
      where: {
        status: 'ACTIVE',
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      },
    }),
}
