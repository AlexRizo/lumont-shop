import { createServerFn } from '@tanstack/react-start'
import { categoryService } from './category.service'
import { CreateCategorySchema } from './category.schema'

export const listCategoriesFn = createServerFn({ method: 'GET' }).handler(() =>
  categoryService.listCategories(),
)

export const getCategoryBySlugFn = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(({ data: slug }) => categoryService.getCategoryBySlug(slug))

export const createCategoryFn = createServerFn({ method: 'POST' })
  .validator(CreateCategorySchema)
  .handler(({ data }) => categoryService.createCategory(data))
