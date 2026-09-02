import { productRepository } from './product.repository'
import type { ListProductsFilter } from './product.schema'
import { toProductDetail, toProductListItem } from './product.mapper'

export const productService = {
  listProducts: async (filter: ListProductsFilter) => {
    const [items, total] = await Promise.all([
      productRepository.findMany(filter),
      productRepository.count(filter),
    ])

    return {
      items: items.map(toProductListItem),
      total,
      page: filter.page,
      totalPages: Math.ceil(total / filter.pageSize),
    }
  },

  getProductBySlug: async (slug: string) => {
    const product = await productRepository.findBySlug(slug)

    if (!product) {
      throw new Error('Producto no encontrado')
    }

    return toProductDetail(product)
  },
}
