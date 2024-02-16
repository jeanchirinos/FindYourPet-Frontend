'use client'
import { IconSearch } from '@/icons'
import { Chip } from '@nextui-org/chip'
import { useFilterPlace } from './useFilterPlace'
import { Combobox } from '@/components/Combobox'

export function FilterPlace() {
  const { filteredPlaces, handleChange, handleRemove, query, setQuery, selectedPlaces } =
    useFilterPlace()

  // RENDER
  return (
    <div className='flex w-96 max-w-full flex-col gap-y-2.5'>
      <Combobox
        options={filteredPlaces}
        value={selectedPlaces}
        onChange={handleChange}
        query={query}
        setQuery={setQuery}
        multiple
        icon={IconSearch}
        itemKeyId='code'
        itemKeyValue='tag.long'
      />

      <div className='flex h-7 gap-x-2.5'>
        {selectedPlaces.map(item => (
          <Chip onClose={() => handleRemove(item)} key={item.code} title={item.tag.long}>
            {item.name}
          </Chip>
        ))}
      </div>
    </div>
  )
}
