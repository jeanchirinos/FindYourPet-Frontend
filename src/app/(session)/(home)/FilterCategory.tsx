import { getCategories } from '@/controllers/Pet'
import { LinkSearchParams } from '@/components/LinkSearchParams'

export async function FilterCategory() {
  const categoriesList = await getCategories()

  return (
    <section>
      <p className='font-semibold text-foreground-900'>Especie</p>

      <div className='grid w-full grid-cols-2 gap-2'>
        {categoriesList.map(item => (
          <LinkSearchParams
            key={item.id}
            searchParamKey='category_id'
            searchParamValue={item.id}
            toggle
            keysToDelete={['breed_id', 'page']}
            classNames={{
              selected: 'bg-orange-100 text-orange-600',
              notSelected: 'bg-transparent hover:bg-foreground-100',
            }}
            className='h-fit cursor-pointer flex-col justify-start gap-y-0.5 rounded-md border border-foreground-300 p-1 text-center flex-center'
          >
            <div className='*:size-4' dangerouslySetInnerHTML={{ __html: item.image }} />
            <span>{item.name}</span>
          </LinkSearchParams>
        ))}
      </div>
    </section>
  )
}
