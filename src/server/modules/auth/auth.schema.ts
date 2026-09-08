import { z } from 'zod'

export const SignUpSchema = z
  .object({
    name: z.string().min(1, 'El nombre es requerido'),
    email: z.email('El correo no es válido'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const SignInSchema = z.object({
  email: z.email('El correo no es válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export type SignIn = z.infer<typeof SignInSchema>
export type SignUp = z.infer<typeof SignUpSchema>
