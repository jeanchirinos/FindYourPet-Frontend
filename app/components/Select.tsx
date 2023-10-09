import { SetState } from '@/types'
import { Select as BaseSelect, SelectItem } from '@nextui-org/react'

type Props = Omit<React.ComponentProps<typeof BaseSelect>, 'children'> & {
  array: any[]
  objectKey: string
  objectId: string
  selected?: any
  setSelected?: SetState<any>
}

export function Select(props: Props) {
  const { array, objectKey, objectId, selected, setSelected, ...otherProps } = props

  const arrayOfObjectsToStrings = array.map(obj => {
    const newObj: any = {}
    for (const key in obj) {
      newObj[key] = obj[key].toString()
    }

    return newObj
  })

  return (
    <BaseSelect
      className='max-w-xs'
      selectedKeys={selected}
      onSelectionChange={setSelected}
      disallowEmptySelection
      {...otherProps}
    >
      {arrayOfObjectsToStrings.map(a => (
        <SelectItem key={a[objectId]} value={a[objectId]}>
          {a[objectKey]}
        </SelectItem>
      ))}
    </BaseSelect>
  )
}

type Props2 = React.ComponentProps<'select'> & {
  array: any[]
  objectKey: string
  objectId: string
  selected?: any
  setSelected?: SetState<any>
}

export function SelectNative(props: Props2) {
  const { array, objectKey, objectId, selected, setSelected, ...otherProps } = props

  // const arrayOfObjectsToStrings = array.map(obj => {
  //   const newObj: any = {}
  //   for (const key in obj) {
  //     newObj[key] = obj[key].toString()
  //   }

  //   return newObj
  // })

  // FUNCTIONS

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!setSelected) return

    setSelected(e.target.value)
  }

  // RENDER
  return (
    <select required {...otherProps} onChange={handleChange} value={selected?.toString()}>
      {array.map(a => (
        <option key={a[objectId]} value={a[objectId].toString()}>
          {a[objectKey]}
        </option>
      ))}
    </select>
  )
}
