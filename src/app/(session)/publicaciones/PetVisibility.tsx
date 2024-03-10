import { LinkSearchParams } from '@/components/LinkSearchParams'
import { DEFAULT_PET_PUBLISHED } from '@/controllers/PetController/constants'

export function PetVisibility() {
  const tabs = [
    {
      id: '0',
      title: 'En revisión',
    },
    {
      id: '1',
      title: 'Aprobados',
    },
  ]

  return (
    <nav className='flex gap-x-2'>
      {tabs.map(item => (
        <LinkSearchParams
          key={item.id}
          searchParamKey='published'
          searchParamValue={item.id}
          defaultParam={DEFAULT_PET_PUBLISHED}
          keysToDelete={['page']}
          className='h-fit rounded-md py-1.5'
          classNames={{
            notSelected: 'bg-transparent',
          }}
        >
          {item.title}
        </LinkSearchParams>
      ))}
    </nav>
  )
}
