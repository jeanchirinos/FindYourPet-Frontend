import { SetState } from '@/types'

type Props = React.ComponentProps<'select'> & {
  array: any[] | undefined
  objectKey: string
  objectId: string
  selected?: any
  setSelected?: SetState<any>
  placeholder: string
}

export function Select(props: Props) {
  const { array, objectKey, objectId, selected, setSelected, ...otherProps } = props

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!setSelected) return

    setSelected(e.target.value)
  }

  // RENDER
  return (
    <label className='flex flex-col gap-y-1 rounded-lg bg-default-100 px-2 py-1.5'>
      <span className='pointer-events-none absolute ml-1 text-xs text-foreground-600'>
        {props.placeholder}
      </span>
      <select
        required
        {...otherProps}
        onChange={handleChange}
        value={selected?.toString()}
        className='cursor-pointer bg-default-100 pt-4 text-sm focus:outline-none'
      >
        {array?.map(a => (
          <option key={a[objectId]} value={a[objectId].toString()}>
            {a[objectKey]}
          </option>
        ))}
      </select>
    </label>
  )
}
