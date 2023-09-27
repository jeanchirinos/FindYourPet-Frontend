'use server'

import { DefaultSuccessResponse } from '@/hooks/useSendData'
import { request } from '@/utilities/requestServer'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function updateUser(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().nonempty(),
    username: z.string().nonempty(),
    mobile: z.string().nonempty(),
  })

  const data = schema.parse({
    name: formData.get('name'),
    username: formData.get('username'),
    mobile: formData.get('mobile'),
  })

  try {
    const response = await request<DefaultSuccessResponse>('user-update', {
      config: {
        method: 'POST',
        body: data,
      },
    })

    revalidatePath('/')
    return response
  } catch (e) {
    return { msg: 'Failed to update user' }
  }
}

// export async function deleteTodo(prevState: any, formData: FormData) {
//   const schema = z.object({
//     id: z.string().nonempty(),
//     todo: z.string().nonempty(),
//   })
//   const data = schema.parse({
//     id: formData.get('id'),
//     todo: formData.get('todo'),
//   })

//   try {
//     await sql`
//       DELETE FROM todos
//       WHERE id = ${data.id};
//     `

//     revalidatePath('/')
//     return { message: `Deleted todo ${data.todo}` }
//   } catch (e) {
//     return { message: 'Failed to delete todo' }
//   }
// }
