'use client'
import { Chip } from '@nextui-org/chip'
import { Breed } from '@/models/Breed'
import { useFilterBreedsClient } from './useFilterBreedsClient'
import { Combobox } from '@/components/Combobox'

type Props = { breeds: Breed[] }

export function FilterBreedsClient(props: Props) {
  const { filteredBreeds, handleChange, handleRemove, query, selectedBreeds, setQuery } =
    useFilterBreedsClient(props.breeds)

  // RENDER
  return (
    <div className='flex w-full flex-col gap-y-5'>
      <Combobox
        placeholder='Raza'
        options={filteredBreeds}
        value={selectedBreeds}
        onChange={handleChange}
        query={query}
        setQuery={setQuery}
        multiple
      />

      {selectedBreeds.length > 0 && (
        <div className='flex flex-wrap gap-2.5'>
          {selectedBreeds.map(item => (
            <Chip onClose={() => handleRemove(item)} key={item.id}>
              {item.name}
            </Chip>
          ))}
        </div>
      )}
    </div>
  )
}
