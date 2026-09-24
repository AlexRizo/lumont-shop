import { createServerFn } from '@tanstack/react-start'
import { categoryService } from './category.service'
import { CreateCategorySchema } from './category.schema'
import { requireAdminMiddleware } from '#/server/middlewares/auth.middleware'

export const listCategoriesFn = createServerFn({ method: 'GET' }).handler(() =>
  categoryService.listCategories(),
)

export const getCategoryBySlugFn = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(({ data: slug }) => categoryService.getCategoryBySlug(slug))

export const createCategoryFn = createServerFn({ method: 'POST' })
  .validator(CreateCategorySchema)
  .middleware([requireAdminMiddleware])
  .handler(({ data }) => categoryService.createCategory(data))
