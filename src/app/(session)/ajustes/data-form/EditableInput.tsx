import { updateValue } from '@/controllers/User'
import { handleResponse } from '@/utilities/handleResponse'
import { AutoInput } from './AutoInput'

type Props = {
  initialValue: string | null
  paramName: string
  label: string
  children?: React.ReactNode
}

export function EditableInput(props: Props) {
  const initialValue = props.initialValue ?? ''

  // FUNCTIONS
  async function handleAction(formData: FormData) {
    const { paramName } = props

    const value = formData.get(paramName) as string

    const res = await updateValue({ param: paramName, value })

    handleResponse(res, {
      showSuccessToast: true,
    })
  }

  // RENDER
  return (
    <form action={handleAction} className='group mt-4 flex items-center gap-x-2'>
      <AutoInput {...props} initialValue={initialValue} />
    </form>
  )
}
