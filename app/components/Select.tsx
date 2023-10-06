import { SetState } from '@/types'
import { Select as BaseSelect, SelectItem } from '@nextui-org/react'

type Props = Omit<React.ComponentProps<typeof BaseSelect>, 'children'> & {
  array: any[]
  objectKey: string
  objectId: string
  selected: any
  setSelected: SetState<any>
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
    <div className='flex w-full max-w-xs flex-col gap-2'>
      <BaseSelect
        selectedKeys={selected}
        className='max-w-xs'
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
    </div>
  )
}
