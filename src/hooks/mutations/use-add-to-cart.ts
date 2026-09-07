import { authClient } from '#/lib/auth-client'
import { addCartItemFn } from '#/server/modules/cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  variantId: string
  quantity?: number
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ variantId, quantity }: Props) => {
      const { data: session } = await authClient.getSession()
      if (!session) {
        await authClient.signIn.anonymous()
      }

      return addCartItemFn({ data: { variantId, quantity } })
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(['cart'], cart)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}
