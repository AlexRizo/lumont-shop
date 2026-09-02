import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.cuid2(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  parentId: z.cuid2().nullable(),
})

export const CreateCategorySchema = z.object({
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug debe ser kebab-case (ej: cabello-humano)',
    ),
  description: z.string().min(2).max(1000).optional(),
  image: z.url().optional(),
  parentId: z.cuid2().optional(),
})

export type Category = z.infer<typeof CategorySchema>
export type CreateCategory = z.infer<typeof CreateCategorySchema>
