import { categoryRepository } from './category.repository'
import type { CreateCategory } from './category.schema'

export const categoryService = {
  listCategories: () => categoryRepository.findAll(),
  getCategoryBySlug: async (slug: string) => {
    const category = await categoryRepository.findBySlug(slug)

    if (!category) throw new Error(`La categoría no existe`)

    return category
  },

  createCategory: async (data: CreateCategory) => {
    const existing = await categoryRepository.findBySlug(data.slug)

    if (existing) {
      throw new Error(`La categoría con el slug ${data.slug} ya existe`)
    }

    return categoryRepository.create(data)
  },
}
